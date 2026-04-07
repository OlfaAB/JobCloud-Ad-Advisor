import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { MarketData } from '../../types';
import { formatCHF } from '../../utils/helpers';

interface SalaryDistributionProps {
  marketData: MarketData;
  jobTitle: string;
}

export default function SalaryDistribution({ marketData, jobTitle }: SalaryDistributionProps) {
  const data = marketData.similarRoles.map(role => ({
    name: role.title.length > 18 ? role.title.slice(0, 16) + '…' : role.title,
    p25: marketData.salaryP25,
    p50: marketData.salaryP50,
    p75: marketData.salaryP75,
    count: role.count,
  }));

  // Build bell-curve-like distribution bars
  const distData = [
    { range: `${Math.round(marketData.salaryP25 / 1000)}k`, count: 8, fill: '#E2E8F0' },
    { range: `${Math.round((marketData.salaryP25 + marketData.salaryP50) / 2 / 1000)}k`, count: 22, fill: '#CBD5E1' },
    { range: `${Math.round(marketData.salaryP50 / 1000)}k`, count: 38, fill: '#3B82F6' },
    { range: `${Math.round((marketData.salaryP50 + marketData.salaryP75) / 2 / 1000)}k`, count: 24, fill: '#CBD5E1' },
    { range: `${Math.round(marketData.salaryP75 / 1000)}k`, count: 10, fill: '#E2E8F0' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Salary Distribution — {jobTitle}</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={distData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="range" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value) => [`${value} candidates`, 'Count']}
              labelFormatter={(label) => `~CHF ${label}/year`}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {distData.map((entry, index) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Percentile markers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 font-medium">P25</p>
          <p className="text-sm font-bold text-slate-700 mt-0.5">{formatCHF(marketData.salaryP25)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
          <p className="text-xs text-blue-600 font-medium">Median (P50)</p>
          <p className="text-sm font-bold text-blue-700 mt-0.5">{formatCHF(marketData.salaryP50)}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 font-medium">P75</p>
          <p className="text-sm font-bold text-slate-700 mt-0.5">{formatCHF(marketData.salaryP75)}</p>
        </div>
      </div>
    </div>
  );
}
