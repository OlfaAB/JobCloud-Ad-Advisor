import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export default function Card({ children, className = '', glass = false }: CardProps) {
  return (
    <div
      className={`rounded-xl ${
        glass
          ? 'bg-white/80 backdrop-blur-sm border border-white/20'
          : 'bg-white border border-slate-200'
      } shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
