import React, { useState } from 'react';
import { Eye, EyeOff, BarChart2, DollarSign, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobSession } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import { formatCHF, formatDate } from '../../utils/helpers';

type StatusFilter = 'All' | JobSession['status'];

export default function AdManager() {
  const { state, dispatch } = useApp();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const sessions = state.sessions.filter(s => s.phase >= 6 || s.status === 'Published' || s.status === 'Offline');

  const filtered = statusFilter === 'All'
    ? sessions
    : sessions.filter(s => s.status === statusFilter);

  const totalAds = sessions.length;
  const publishedAds = sessions.filter(s => s.status === 'Published').length;
  const totalApplications = sessions.reduce((sum, s) => sum + (s.performanceMetrics?.estimatedApplications ?? 0), 0);
  const avgCost = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.selectedPrice ?? 0), 0) / sessions.length)
    : 0;

  function handleToggle(sessionId: string) {
    dispatch({ type: 'TOGGLE_SESSION_ONLINE', payload: sessionId });
  }

  function getTitle(s: JobSession): string {
    const f = s.extractedFields;
    if (f.jobTitle) return `${f.seniority ?? ''} ${f.jobTitle}`.trim();
    return s.title;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Ad Manager</h1>
        <p className="text-slate-500 text-sm mt-1">Manage and monitor all your job ads</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: <FileText size={18} />, label: 'Total Ads', value: totalAds, color: 'text-slate-700' },
          { icon: <Eye size={18} />, label: 'Published', value: publishedAds, color: 'text-green-600' },
          { icon: <BarChart2 size={18} />, label: 'Total Applications', value: totalApplications, color: 'text-blue-600' },
          { icon: <DollarSign size={18} />, label: 'Avg. Cost', value: avgCost > 0 ? formatCHF(avgCost) : '—', color: 'text-violet-600' },
        ].map(stat => (
          <Card key={stat.label} className="p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500 mr-1">Filter:</span>
        {(['All', 'Published', 'Offline', 'Draft', 'In Progress', 'Priced'] as StatusFilter[]).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              statusFilter === s
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">
              {sessions.length === 0
                ? 'No published ads yet. Complete the checkout flow to publish your first ad.'
                : 'No ads match this filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Applications</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Views</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Online</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(session => (
                  <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{getTitle(session)}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{session.extractedFields.industry || '—'}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {session.extractedFields.location || '—'}
                    </td>
                    <td className="px-4 py-4">
                      <Badge status={session.status} />
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-700">
                      {session.selectedPrice ? formatCHF(session.selectedPrice) : '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {session.performanceMetrics?.estimatedApplications ?? '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {session.performanceMetrics?.estimatedViews?.toLocaleString() ?? '—'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {formatDate(session.updatedAt)}
                    </td>
                    <td className="px-4 py-4">
                      <Toggle
                        checked={session.status === 'Published'}
                        onChange={() => handleToggle(session.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
