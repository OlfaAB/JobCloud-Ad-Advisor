import React from 'react';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

function getZoneColor(value: number): string {
  if (value < 800) return 'text-red-500';
  if (value < 1500) return 'text-yellow-500';
  if (value < 3000) return 'text-green-500';
  return 'text-blue-500';
}

function getZoneLabel(value: number): string {
  if (value < 800) return 'Budget';
  if (value < 1500) return 'Standard';
  if (value < 3000) return 'Recommended';
  return 'Premium';
}

export default function Slider({ value, min = 200, max = 5000, step = 50, onChange }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-3">
        <div className="absolute inset-0 h-3 bg-gradient-to-r from-red-300 via-yellow-300 via-green-300 to-blue-300 rounded-full" />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-3"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-lg transition-all pointer-events-none"
          style={{ left: `calc(${percentage}% - 10px)`, zIndex: 1 }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-xs text-slate-400">
          <span className="text-red-400">Budget</span>
          <span className="text-yellow-400">Standard</span>
          <span className="text-green-500">Recommended</span>
          <span className="text-blue-500">Premium</span>
        </div>
        <div className={`text-sm font-semibold ${getZoneColor(value)}`}>
          {getZoneLabel(value)}
        </div>
      </div>
    </div>
  );
}
