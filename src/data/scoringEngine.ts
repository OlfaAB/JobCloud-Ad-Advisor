import { ExtractedFields } from '../types';

export function calculateTalentScarcity(fields: ExtractedFields): number {
  let score = 50;

  const seniorityScores: Record<string, number> = {
    'Junior': -20, 'Mid': 0, 'Senior': 15, 'Lead': 25, 'Director': 35, 'C-Level': 45
  };
  score += seniorityScores[fields.seniority || 'Mid'] || 0;

  const locationScores: Record<string, number> = {
    'Zürich': -5, 'Geneva': -5, 'Basel': 0, 'Bern': 5, 'Zug': 10, 'Ticino': 20, 'Lugano': 20
  };
  const locScore = Object.entries(locationScores).find(([loc]) =>
    fields.location?.includes(loc))?.[1] || 0;
  score += locScore;

  const specializedIndustries = ['Biotech', 'Fintech', 'AI/ML', 'Blockchain', 'Quantum', 'Machine Learning'];
  if (fields.industry && specializedIndustries.some(i => fields.industry?.includes(i))) {
    score += 20;
  }

  return Math.min(100, Math.max(0, score));
}

export function calculateCompetition(fields: ExtractedFields): number {
  let score = 40;

  const highCompetitionIndustries = ['Technology', 'Finance', 'Banking', 'Pharma', 'Pharmaceuticals'];
  if (fields.industry && highCompetitionIndustries.some(i => fields.industry?.includes(i))) {
    score += 25;
  }

  if (fields.location?.includes('Zürich') || fields.location?.includes('Geneva')) {
    score += 15;
  }

  if (fields.seniority === 'Senior' || fields.seniority === 'Lead') {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

export function calculateHiringDifficulty(scarcity: number, competition: number): {
  score: number;
  label: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
} {
  const combined = scarcity * 0.6 + competition * 0.4;

  let label: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  if (combined <= 30) label = 'Easy';
  else if (combined <= 55) label = 'Moderate';
  else if (combined <= 75) label = 'Hard';
  else label = 'Very Hard';

  return { score: combined, label };
}
