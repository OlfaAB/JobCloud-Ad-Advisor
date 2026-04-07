import React from 'react';
import { ArrowRight, Eye, Clock, Users, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PerformanceChart from '../charts/PerformanceChart';
import { formatCHF } from '../../utils/helpers';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

function MetricCard({ icon, label, value, sub, highlight }: MetricCardProps) {
  return (
    <Card className={`p-5 ${highlight ? 'border-blue-200 bg-blue-50' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className={`text-xl font-bold ${highlight ? 'text-blue-700' : 'text-slate-800'}`}>{value}</p>
          {sub && <p className="text-xs text-slate-400">{sub}</p>}
        </div>
      </div>
    </Card>
  );
}

export default function PerformancePreview() {
  const { activeSession, dispatch } = useApp();
  const metrics = activeSession?.performanceMetrics;
  const selectedPrice = activeSession?.selectedPrice ?? 0;

  if (!activeSession || !metrics) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>Please complete the Pricing step first.</p>
      </div>
    );
  }

  function handleProceed() {
    if (!activeSession) return;
    dispatch({ type: 'ADVANCE_SESSION_PHASE', payload: { sessionId: activeSession.id, phase: 5 } });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Performance Preview</h1>
        <p className="text-slate-500 text-sm mt-1">
          Projected results for your ad at {formatCHF(selectedPrice)}
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          icon={<Eye size={20} />}
          label="Projected Views"
          value={metrics.estimatedViews.toLocaleString()}
          sub="30-day estimate"
          highlight
        />
        <MetricCard
          icon={<Users size={20} />}
          label="Est. Applications"
          value={metrics.estimatedApplications.toLocaleString()}
          sub={`~${metrics.qualifiedCandidates} qualified`}
        />
        <MetricCard
          icon={<Clock size={20} />}
          label="Time to Hire"
          value={`${metrics.timeToHireDays} days`}
          sub="estimated"
        />
        <MetricCard
          icon={<DollarSign size={20} />}
          label="Cost per Application"
          value={formatCHF(metrics.costPerApplication)}
          sub="avg per applicant"
        />
      </div>

      {/* 30-day chart */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-700 mb-4">30-Day Performance Projection</h3>
        <PerformanceChart projections={metrics.dailyProjections} />
      </Card>

      {/* Comparison */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-700 mb-4">Your Ad vs. Market Average</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Views', yours: metrics.estimatedViews, avg: 850 },
            { label: 'Applications', yours: metrics.estimatedApplications, avg: 22 },
            { label: 'Time to Hire', yours: metrics.timeToHireDays, avg: 42, lowerIsBetter: true },
          ].map(item => {
            const better = item.lowerIsBetter ? item.yours < item.avg : item.yours > item.avg;
            return (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 font-medium mb-2">{item.label}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400">Your Ad</p>
                    <p className={`text-lg font-bold ${better ? 'text-green-600' : 'text-orange-500'}`}>
                      {item.yours.toLocaleString()}{item.label === 'Time to Hire' ? 'd' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Market Avg</p>
                    <p className="text-base font-semibold text-slate-500">
                      {item.avg.toLocaleString()}{item.label === 'Time to Hire' ? 'd' : ''}
                    </p>
                  </div>
                </div>
                <div className={`mt-2 text-xs font-medium ${better ? 'text-green-600' : 'text-orange-500'}`}>
                  {better ? '✓ Above average' : '↓ Below average'}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleProceed}>
          Proceed to Checkout
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
