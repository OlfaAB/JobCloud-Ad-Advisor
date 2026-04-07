import { ExtractedFields } from '../types';

export function getConfidence(field: keyof ExtractedFields, value: unknown): 'high' | 'medium' | 'low' {
  if (!value) return 'low';
  if (Array.isArray(value) && value.length === 0) return 'low';
  if (typeof value === 'string' && value.length < 3) return 'medium';
  return 'high';
}

export function getCompletionPercentage(fields: ExtractedFields): number {
  const requiredFields: (keyof ExtractedFields)[] = ['jobTitle', 'location', 'seniority', 'urgency', 'industry'];
  const filled = requiredFields.filter(f => fields[f]).length;
  return Math.round((filled / requiredFields.length) * 100);
}

export function extractJobTitle(text: string): string | undefined {
  const patterns = [
    /(?:hiring|looking for|need|seeking|position|role|job)[:\s]+(?:a\s+)?([a-zA-Z\s]+(?:developer|engineer|manager|analyst|designer|consultant|director|lead|architect|scientist|specialist))/i,
    /([a-zA-Z\s]+(?:developer|engineer|manager|analyst|designer|consultant|director|lead|architect|scientist|specialist))\s+(?:position|role|job)/i,
    /^([A-Z][a-zA-Z\s]+(?:developer|engineer|manager|analyst|designer|consultant|director|lead|architect|scientist|specialist))/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  return undefined;
}

export function extractLocation(text: string): string | undefined {
  const locations = ['Zürich', 'Zurich', 'Geneva', 'Basel', 'Bern', 'Zug', 'Lausanne', 'Ticino', 'Lugano', 'St. Gallen'];
  for (const loc of locations) {
    if (text.toLowerCase().includes(loc.toLowerCase())) {
      return loc === 'Zurich' ? 'Zürich' : loc;
    }
  }
  return undefined;
}

export function extractSeniority(text: string): ExtractedFields['seniority'] | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('c-level') || lower.includes('ceo') || lower.includes('cto') || lower.includes('cfo')) return 'C-Level';
  if (lower.includes('director')) return 'Director';
  if (lower.includes('lead') || lower.includes('principal')) return 'Lead';
  if (lower.includes('senior') || lower.includes('sr.') || lower.includes('sr ')) return 'Senior';
  if (lower.includes('junior') || lower.includes('jr.') || lower.includes('jr ') || lower.includes('entry')) return 'Junior';
  if (lower.includes('mid') || lower.includes('intermediate')) return 'Mid';
  return undefined;
}

export function extractUrgency(text: string): ExtractedFields['urgency'] | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('immediate') || lower.includes('asap') || lower.includes('urgent')) return 'Immediate';
  if (lower.includes('2 week') || lower.includes('two week')) return '2 weeks';
  if (lower.includes('3 month') || lower.includes('three month')) return '3 months';
  if (lower.includes('no rush') || lower.includes('flexible') || lower.includes('whenever')) return 'No rush';
  if (lower.includes('month')) return '1 month';
  return undefined;
}

export function extractIndustry(text: string): string | undefined {
  const industries = [
    { keywords: ['pharma', 'biotech', 'pharmaceutical', 'medical', 'health', 'clinical'], name: 'Pharmaceuticals' },
    { keywords: ['bank', 'finance', 'financial', 'fintech', 'insurance', 'investment'], name: 'Finance & Banking' },
    { keywords: ['tech', 'software', 'it ', 'technology', 'digital', 'saas', 'cloud'], name: 'Technology' },
    { keywords: ['retail', 'e-commerce', 'consumer', 'fmcg'], name: 'Retail' },
    { keywords: ['manufacturing', 'industrial', 'engineering', 'production'], name: 'Manufacturing' },
    { keywords: ['consulting', 'advisory', 'professional service'], name: 'Consulting' },
  ];

  const lower = text.toLowerCase();
  for (const { keywords, name } of industries) {
    if (keywords.some(k => lower.includes(k))) return name;
  }
  return undefined;
}
