import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailyProjection } from '../../types';

interface PerformanceChartProps {
  projections: DailyProjection[];
}

export default function PerformanceChart({ projections }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart
        data={projections}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11 }}
          label={{ value: 'Day', position: 'insideBottomRight', offset: -5, fontSize: 11 }}
        />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          labelFormatter={(label) => `Day ${label}`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="views"
          name="Views"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="applications"
          name="Applications"
          stroke="#059669"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
