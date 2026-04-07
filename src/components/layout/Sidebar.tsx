import React, { useState } from 'react';
import { Plus, Search, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobSession } from '../../types';
import Badge from '../ui/Badge';
import { formatRelativeTime } from '../../utils/helpers';

function createNewSession(): JobSession {
  return {
    id: `session-${Date.now()}`,
    title: 'New Job Ad',
    status: 'Draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: [],
    extractedFields: {},
    phase: 1,
  };
}

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState('');

  const filtered = state.sessions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.extractedFields.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  function handleNewSession() {
    const session = createNewSession();
    dispatch({ type: 'CREATE_SESSION', payload: session });
  }

  function handleSelectSession(id: string) {
    dispatch({ type: 'SET_ACTIVE_SESSION', payload: id });
  }

  function getSessionTitle(session: JobSession): string {
    if (session.extractedFields.jobTitle) {
      const loc = session.extractedFields.location ? ` · ${session.extractedFields.location}` : '';
      return `${session.extractedFields.jobTitle}${loc}`;
    }
    return session.title;
  }

  return (
    <aside className="w-72 bg-slate-800 text-white flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase size={16} />
          </div>
          <span className="font-semibold text-sm">JobCloud Ad Advisor</span>
        </div>
        <button
          onClick={handleNewSession}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Job Ad
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-slate-700">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-700 text-white text-sm placeholder-slate-400 pl-8 pr-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto py-2">
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-slate-500 text-sm">
            {state.sessions.length === 0
              ? 'Click "+ New Job Ad" to get started'
              : 'No sessions match your search'}
          </div>
        )}
        {filtered.map(session => (
          <button
            key={session.id}
            onClick={() => handleSelectSession(session.id)}
            className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-l-2 ${
              state.activeSessionId === session.id
                ? 'bg-slate-700 border-blue-500'
                : 'border-transparent'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-white truncate leading-tight">
                {getSessionTitle(session)}
              </p>
              <Badge status={session.status} className="shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(session.updatedAt)}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">© 2024 JobCloud AG</p>
      </div>
    </aside>
  );
}
