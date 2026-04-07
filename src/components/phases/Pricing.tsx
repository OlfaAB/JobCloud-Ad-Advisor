import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculatePerformanceMetrics } from '../../data/performanceModel';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SliderComponent from '../ui/Slider';
import TalentFunnel from '../charts/TalentFunnel';
import { formatCHF } from '../../utils/helpers';

export default function Pricing() {
  const { activeSession, dispatch } = useApp();
  const pricingResult = activeSession?.pricingResult;
  const [price, setPrice] = useState(pricingResult?.recommendedPrice ?? 1000);

  useEffect(() => {
    if (pricingResult) setPrice(pricingResult.recommendedPrice);
  }, [pricingResult]);

  const performanceMetrics = calculatePerformanceMetrics(price, pricingResult ?? {
    recommendedPrice: price, minPrice: 200, maxPrice: 5000, reasoning: [], breakdown: { basePrice: price, locationMultiplier: 1, urgencyMultiplier: 1, seniorityMultiplier: 1 }
  });

  if (!activeSession || !pricingResult) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>Please complete Market Analysis first.</p>
      </div>
    );
  }

  function handleConfirmPrice() {
    if (!activeSession || !pricingResult) return;
    dispatch({ type: 'SET_SELECTED_PRICE', payload: { sessionId: activeSession.id, price } });
    dispatch({ type: 'SET_PERFORMANCE', payload: { sessionId: activeSession.id, metrics: performanceMetrics } });
    dispatch({ type: 'ADVANCE_SESSION_PHASE', payload: { sessionId: activeSession.id, phase: 4 } });
  }

  const isRecommended = price === pricingResult.recommendedPrice;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pricing Recommendation</h1>
        <p className="text-slate-500 text-sm mt-1">
          Adjust your ad budget to match your hiring goals
        </p>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Price selector */}
        <div className="col-span-3 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500">Your Selected Price</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-4xl font-bold text-slate-800">{formatCHF(price)}</span>
                  {isRecommended && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle size={12} />
                      AI Recommended
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">AI Recommended</p>
                <p className="text-lg font-bold text-blue-600">{formatCHF(pricingResult.recommendedPrice)}</p>
              </div>
            </div>

            <SliderComponent value={price} min={200} max={5000} step={50} onChange={setPrice} />

            <button
              onClick={() => setPrice(pricingResult.recommendedPrice)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Reset to AI recommendation
            </button>
          </Card>

          {/* Reasoning */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Info size={15} />
              Pricing Rationale
            </h3>
            <ul className="space-y-2">
              {pricingResult.reasoning.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </Card>

          {/* Breakdown */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-700 mb-3">Price Breakdown</h3>
            <div className="space-y-2">
              {[
                { label: 'Base Price', value: formatCHF(pricingResult.breakdown.basePrice) },
                { label: 'Location Multiplier', value: `×${pricingResult.breakdown.locationMultiplier.toFixed(2)}` },
                { label: 'Urgency Multiplier', value: `×${pricingResult.breakdown.urgencyMultiplier.toFixed(2)}` },
                { label: 'Seniority Multiplier', value: `×${pricingResult.breakdown.seniorityMultiplier.toFixed(2)}` },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-medium text-slate-700">{row.value}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold">
                <span>Final Price</span>
                <span className="text-blue-600">{formatCHF(price)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Talent Funnel */}
        <div className="col-span-2 space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-700 mb-4">Estimated Talent Funnel</h3>
            <TalentFunnel metrics={performanceMetrics} />
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleConfirmPrice}>
          Confirm Price & See Performance
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
