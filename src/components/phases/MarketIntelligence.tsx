import React from 'react';
import { ArrowRight, Building2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculatePricing } from '../../data/pricingEngine';
import Card from '../ui/Card';
import Button from '../ui/Button';
import GaugeChart from '../charts/GaugeChart';
import SalaryDistribution from '../charts/SalaryDistribution';
import { formatCHF } from '../../utils/helpers';

const DIFFICULTY_STYLES = {
  Easy: 'bg-green-100 text-green-700 border-green-200',
  Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Hard: 'bg-orange-100 text-orange-700 border-orange-200',
  'Very Hard': 'bg-red-100 text-red-700 border-red-200',
};

export default function MarketIntelligence() {
  const { activeSession, dispatch } = useApp();
  const marketData = activeSession?.marketData;
  const fields = activeSession?.extractedFields ?? {};

  if (!activeSession || !marketData) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>No market data available. Please complete the Job Details step first.</p>
      </div>
    );
  }

  function handleProceed() {
    if (!activeSession || !marketData) return;
    const pricingResult = calculatePricing(fields, marketData);
    dispatch({ type: 'SET_PRICING', payload: { sessionId: activeSession.id, result: pricingResult } });
    dispatch({ type: 'ADVANCE_SESSION_PHASE', payload: { sessionId: activeSession.id, phase: 3 } });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Market Intelligence</h1>
          <p className="text-slate-500 text-sm mt-1">
            Swiss job market analysis for{' '}
            <span className="font-medium text-slate-700">
              {fields.seniority} {fields.jobTitle}
            </span>{' '}
            in <span className="font-medium text-slate-700">{fields.location}</span>
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl border font-semibold text-base ${DIFFICULTY_STYLES[marketData.hiringDifficulty]}`}>
          Hiring Difficulty: {marketData.hiringDifficulty}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Salary Distribution */}
        <Card className="col-span-2 p-5">
          <SalaryDistribution marketData={marketData} jobTitle={fields.jobTitle || 'Role'} />
        </Card>

        {/* Gauge Charts */}
        <Card className="p-5 flex flex-col gap-4 items-center justify-center">
          <GaugeChart value={marketData.talentScarcity} label="Talent Scarcity" />
          <GaugeChart value={marketData.competitionScore} label="Competition" />
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Similar Roles */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Similar Roles
          </h3>
          <div className="space-y-2">
            {marketData.similarRoles.map((role, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{role.title}</p>
                  <p className="text-xs text-slate-400">{role.count} open positions</p>
                </div>
                <span className="text-sm font-semibold text-slate-600">{role.salaryRange}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Competitor companies */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Building2 size={16} />
            Active Competitors
          </h3>
          <div className="space-y-2">
            {marketData.competitorCompanies.slice(0, 6).map((co, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{co.name}</p>
                  <p className="text-xs text-slate-400">{co.industry}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{co.openPositions} open roles</p>
                  <p className="text-xs font-medium text-slate-600">avg {formatCHF(co.avgSalary)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleProceed}>
          Proceed to Pricing
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
