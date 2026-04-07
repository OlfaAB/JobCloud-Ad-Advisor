import React from 'react';

interface GaugeChartProps {
  value: number;
  label: string;
  maxValue?: number;
  colorStart?: string;
  colorEnd?: string;
  size?: number;
}

export default function GaugeChart({
  value,
  label,
  maxValue = 100,
  size = 160,
}: GaugeChartProps) {
  const normalised = Math.min(1, Math.max(0, value / maxValue));
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = size * 0.38;
  const strokeWidth = size * 0.09;

  // Arc goes from 210° to 330° (150° sweep for a wide semicircle)
  const startAngle = 210;
  const endAngle = 330;
  const sweepAngle = 300; // total arc span in degrees

  function polarToXY(angleDeg: number, radius: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function describeArc(start: number, end: number, radius: number) {
    const s = polarToXY(start, radius);
    const e = polarToXY(end, radius);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const valueDeg = startAngle + normalised * sweepAngle;

  // Colour based on value
  function getColor(v: number): string {
    if (v < 30) return '#059669';
    if (v < 55) return '#D97706';
    if (v < 75) return '#F97316';
    return '#DC2626';
  }

  const trackPath = describeArc(startAngle, startAngle + sweepAngle, r);
  const filledPath = describeArc(startAngle, valueDeg, r);
  const needleEnd = polarToXY(valueDeg, r * 0.75);
  const needleBase1 = polarToXY(valueDeg - 90, strokeWidth * 0.2);
  const needleBase2 = polarToXY(valueDeg + 90, strokeWidth * 0.2);
  const color = getColor(value);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.75}`}>
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={filledPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Needle */}
        <polygon
          points={`${needleEnd.x},${needleEnd.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
          fill={color}
          opacity={0.85}
        />
        <circle cx={cx} cy={cy} r={strokeWidth * 0.4} fill={color} />
        {/* Value text */}
        <text x={cx} y={cy - r * 0.1} textAnchor="middle" fontSize={size * 0.14} fontWeight="700" fill="#1E293B">
          {Math.round(value)}
        </text>
        <text x={cx} y={cy + r * 0.22} textAnchor="middle" fontSize={size * 0.08} fill="#94A3B8">
          /100
        </text>
      </svg>
      <p className="text-sm font-semibold text-slate-700 -mt-2">{label}</p>
    </div>
  );
}
