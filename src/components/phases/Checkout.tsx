import React, { useState } from 'react';
import { CheckCircle, MapPin, Briefcase, Clock, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ConfettiEffect from '../ui/ConfettiEffect';
import { formatCHF, formatDate } from '../../utils/helpers';

export default function Checkout() {
  const { activeSession, dispatch } = useApp();
  const [agreed, setAgreed] = useState(false);
  const [published, setPublished] = useState(false);

  const fields = activeSession?.extractedFields ?? {};
  const price = activeSession?.selectedPrice ?? 0;

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>Please complete previous steps first.</p>
      </div>
    );
  }

  function handlePublish() {
    if (!activeSession || !agreed) return;
    dispatch({ type: 'PUBLISH_SESSION', payload: activeSession.id });
    setPublished(true);
  }

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <ConfettiEffect trigger={published} />
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Job Ad Published! 🎉</h2>
          <p className="text-slate-500 mt-2 text-lg">
            Your ad is now live on JobCloud. You can manage it in the Ad Manager.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 6 })}
        >
          Go to Ad Manager
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Review & Publish</h1>
        <p className="text-slate-500 text-sm mt-1">Review your job ad details before publishing</p>
      </div>

      {/* Summary card */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {fields.seniority} {fields.jobTitle}
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <MapPin size={16} className="text-slate-400" />
            <span><strong>Location:</strong> {fields.location || '—'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Briefcase size={16} className="text-slate-400" />
            <span><strong>Seniority:</strong> {fields.seniority || '—'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Building size={16} className="text-slate-400" />
            <span><strong>Industry:</strong> {fields.industry || '—'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock size={16} className="text-slate-400" />
            <span><strong>Urgency:</strong> {fields.urgency || '—'}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Total Ad Price</p>
            <p className="text-3xl font-bold text-blue-600 mt-0.5">{formatCHF(price)}</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Published: {formatDate(new Date())}</p>
            <p className="mt-0.5">Duration: 30 days</p>
          </div>
        </div>
      </Card>

      {/* Performance summary */}
      {activeSession.performanceMetrics && (
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 mb-3">Expected Performance</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-lg font-bold text-blue-600">{activeSession.performanceMetrics.estimatedViews.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-0.5">Projected Views</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-lg font-bold text-green-600">{activeSession.performanceMetrics.estimatedApplications}</p>
              <p className="text-xs text-slate-500 mt-0.5">Est. Applications</p>
            </div>
            <div className="bg-violet-50 rounded-lg p-3">
              <p className="text-lg font-bold text-violet-600">{activeSession.performanceMetrics.timeToHireDays}d</p>
              <p className="text-xs text-slate-500 mt-0.5">Time to Hire</p>
            </div>
          </div>
        </Card>
      )}

      {/* Terms */}
      <Card className="p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
          />
          <span className="text-sm text-slate-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>. I confirm the job ad details are accurate and authorise the charge of {formatCHF(price)}.
          </span>
        </label>
      </Card>

      <Button
        size="lg"
        className="w-full"
        onClick={handlePublish}
        disabled={!agreed}
      >
        Publish Job Ad — {formatCHF(price)}
      </Button>
    </div>
  );
}
