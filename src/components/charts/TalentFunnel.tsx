import React from 'react';
import { PerformanceMetrics } from '../../types';

interface TalentFunnelProps {
  metrics: PerformanceMetrics;
}

export default function TalentFunnel({ metrics }: TalentFunnelProps) {
  const steps = [
    { label: 'Views', value: metrics.estimatedViews, color: 'bg-blue-500', textColor: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Clicks', value: metrics.estimatedClicks, color: 'bg-indigo-500', textColor: 'text-indigo-700', bg: 'bg-indigo-50' },
    { label: 'Applications', value: metrics.estimatedApplications, color: 'bg-violet-500', textColor: 'text-violet-700', bg: 'bg-violet-50' },
    { label: 'Qualified', value: metrics.qualifiedCandidates, color: 'bg-purple-500', textColor: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Interviews', value: metrics.estimatedInterviews, color: 'bg-pink-500', textColor: 'text-pink-700', bg: 'bg-pink-50' },
    { label: 'Hires', value: metrics.estimatedHires, color: 'bg-rose-500', textColor: 'text-rose-700', bg: 'bg-rose-50' },
  ];

  const maxValue = steps[0].value;

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const widthPct = maxValue > 0 ? (step.value / maxValue) * 100 : 0;
        const conversionRate = i > 0 && steps[i - 1].value > 0
          ? Math.round((step.value / steps[i - 1].value) * 100)
          : 100;

        return (
          <div key={step.label} className="relative">
            <div
              className={`${step.bg} rounded-lg py-2.5 px-4 flex items-center justify-between transition-all duration-500`}
              style={{ marginLeft: `${(100 - widthPct) / 2}%`, marginRight: `${(100 - widthPct) / 2}%` }}
            >
              <span className={`text-xs font-semibold ${step.textColor} uppercase tracking-wide`}>
                {step.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${step.textColor}`}>
                  {step.value.toLocaleString()}
                </span>
                {i > 0 && (
                  <span className="text-xs text-slate-400">({conversionRate}%)</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
