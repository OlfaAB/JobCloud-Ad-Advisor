import { ExtractedFields, MarketData, PricingResult } from '../types';

const BASE_PRICES: Record<string, number> = {
  'Easy': 400,
  'Moderate': 800,
  'Hard': 1500,
  'Very Hard': 2800,
};

const LOCATION_MULTIPLIERS: Record<string, number> = {
  'Zürich': 1.20,
  'Geneva': 1.15,
  'Zug': 1.10,
  'Basel': 1.05,
  'Bern': 1.0,
  'Lausanne': 1.08,
  'Ticino': 0.85,
  'Lugano': 0.85,
};

const URGENCY_MULTIPLIERS: Record<string, number> = {
  'Immediate': 1.30,
  '2 weeks': 1.15,
  '1 month': 1.0,
  '3 months': 0.90,
  'No rush': 0.80,
};

const SENIORITY_MULTIPLIERS: Record<string, number> = {
  'Junior': 0.90,
  'Mid': 1.0,
  'Senior': 1.05,
  'Lead': 1.15,
  'Director': 1.30,
  'C-Level': 1.50,
};

export function calculatePricing(fields: ExtractedFields, marketData: MarketData): PricingResult {
  const basePrice = BASE_PRICES[marketData.hiringDifficulty] || 800;

  const locationMultiplier = Object.entries(LOCATION_MULTIPLIERS).find(([loc]) =>
    fields.location?.includes(loc))?.[1] || 1.0;

  const urgencyMultiplier = URGENCY_MULTIPLIERS[fields.urgency || '1 month'] || 1.0;
  const seniorityMultiplier = SENIORITY_MULTIPLIERS[fields.seniority || 'Mid'] || 1.0;

  const rawPrice = basePrice * locationMultiplier * urgencyMultiplier * seniorityMultiplier;
  const recommendedPrice = Math.round(Math.min(5000, Math.max(200, rawPrice)) / 50) * 50;

  const reasoning: string[] = [];

  if (marketData.hiringDifficulty === 'Very Hard' || marketData.hiringDifficulty === 'Hard') {
    reasoning.push(`High hiring difficulty (${marketData.hiringDifficulty}) increases visibility needs`);
  }
  if (locationMultiplier > 1) {
    reasoning.push(`${fields.location} premium market adds ${Math.round((locationMultiplier - 1) * 100)}% to base price`);
  }
  if (urgencyMultiplier > 1) {
    reasoning.push(`${fields.urgency} urgency requires faster reach — premium applied`);
  }
  if (seniorityMultiplier > 1) {
    reasoning.push(`${fields.seniority} level role commands higher market investment`);
  }
  reasoning.push(`Talent scarcity score: ${marketData.talentScarcity}/100 — competitive positioning recommended`);
  reasoning.push(`${marketData.competitorCompanies.length} companies actively hiring for similar roles`);

  return {
    recommendedPrice,
    minPrice: 200,
    maxPrice: 5000,
    reasoning,
    breakdown: {
      basePrice,
      locationMultiplier,
      urgencyMultiplier,
      seniorityMultiplier,
    },
  };
}
