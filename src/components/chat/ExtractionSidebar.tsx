import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExtractedFields } from '../../types';
import { getCompletionPercentage, getConfidence } from '../../hooks/useExtraction';
import Button from '../ui/Button';

const FIELD_LABELS: { key: keyof ExtractedFields; label: string }[] = [
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'location', label: 'Location' },
  { key: 'seniority', label: 'Seniority' },
  { key: 'urgency', label: 'Urgency' },
  { key: 'industry', label: 'Industry' },
  { key: 'department', label: 'Department' },
];

function ConfidenceDot({ level }: { level: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-green-500',
    medium: 'bg-yellow-400',
    low: 'bg-slate-300',
  };
  return <span className={`w-2 h-2 rounded-full ${colors[level]} inline-block`} />;
}

interface ExtractionSidebarProps {
  fields: ExtractedFields;
  onProceed: () => void;
}

export default function ExtractionSidebar({ fields, onProceed }: ExtractionSidebarProps) {
  const completion = getCompletionPercentage(fields);
  const canProceed = completion >= 60;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-800 mb-1">Extracted Information</h3>
        <p className="text-xs text-slate-500">Fields detected from your conversation</p>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Completion</span>
          <span className="font-medium text-slate-700">{completion}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3 flex-1">
        {FIELD_LABELS.map(({ key, label }) => {
          const value = fields[key];
          const confidence = getConfidence(key, value);
          const hasValue = Boolean(value);

          return (
            <div key={key} className="flex items-start gap-3">
              <div className="mt-0.5">
                {hasValue ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Clock size={16} className="text-slate-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{label}</span>
                  {hasValue && <ConfidenceDot level={confidence} />}
                </div>
                {hasValue ? (
                  <p className="text-sm text-slate-800 font-medium mt-0.5 truncate">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 italic mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
                    Waiting…
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Proceed button */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        {canProceed ? (
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={onProceed}
          >
            Proceed to Analysis
            <ArrowRight size={16} />
          </Button>
        ) : (
          <p className="text-xs text-slate-400 text-center">
            Share more details to unlock market analysis ({completion}% / 60% needed)
          </p>
        )}
      </div>
    </div>
  );
}
