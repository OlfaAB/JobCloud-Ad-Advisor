import React from 'react';
import { useApp } from '../../context/AppContext';
import ChatInterface from '../chat/ChatInterface';
import ExtractionSidebar from '../chat/ExtractionSidebar';
import { getSalaryRange, getCompetitorCompanies, getSimilarRoles } from '../../data/swissMarketData';
import { calculateTalentScarcity, calculateCompetition, calculateHiringDifficulty } from '../../data/scoringEngine';
import { MarketData } from '../../types';

export default function JobDetails() {
  const { activeSession, dispatch } = useApp();
  const fields = activeSession?.extractedFields ?? {};

  function handleProceed() {
    if (!activeSession) return;

    const title = fields.jobTitle || 'Software Engineer';
    const location = fields.location || 'Zürich';
    const seniority = (fields.seniority || 'Mid') as 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Director' | 'C-Level';

    const salaryRange = getSalaryRange(title, seniority, location);
    const competitors = getCompetitorCompanies(title, location);
    const similar = getSimilarRoles(title, seniority, location);
    const talentScarcity = calculateTalentScarcity(fields);
    const competitionScore = calculateCompetition(fields);
    const difficulty = calculateHiringDifficulty(talentScarcity, competitionScore);

    const marketData: MarketData = {
      salaryP25: salaryRange.p25,
      salaryP50: salaryRange.p50,
      salaryP75: salaryRange.p75,
      similarRoles: similar,
      competitorCompanies: competitors,
      talentScarcity,
      competitionScore,
      hiringDifficulty: difficulty.label,
    };

    dispatch({ type: 'SET_MARKET_DATA', payload: { sessionId: activeSession.id, data: marketData } });
    dispatch({ type: 'ADVANCE_SESSION_PHASE', payload: { sessionId: activeSession.id, phase: 2 } });
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800">Tell us about your job</h1>
        <p className="text-slate-500 mt-1 text-sm">Our AI advisor will gather the key details to build your perfect job ad</p>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        <div className="flex-[3] min-h-0">
          <ChatInterface />
        </div>
        <div className="flex-[2] min-h-0">
          <ExtractionSidebar
            fields={fields}
            onProceed={handleProceed}
          />
        </div>
      </div>
    </div>
  );
}
