import React from 'react';
import { JobSession } from '../../types';

type BadgeStatus = JobSession['status'];

const STATUS_STYLES: Record<BadgeStatus, string> = {
  'Draft': 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Analyzing': 'bg-yellow-100 text-yellow-700',
  'Priced': 'bg-green-100 text-green-700',
  'Published': 'bg-purple-100 text-purple-700',
  'Offline': 'bg-red-100 text-red-600',
};

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

export default function Badge({ status, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]} ${className}`}>
      {status}
    </span>
  );
}
