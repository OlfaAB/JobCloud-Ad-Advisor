import { ExtractedFields, MarketData, CompanyData, SimilarRole } from '../types';

type SeniorityLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Director' | 'C-Level';

const salaryData: Record<string, Partial<Record<SeniorityLevel, number>>> = {
  'Software Engineer': { Junior: 75000, Mid: 105000, Senior: 140000, Lead: 165000, Director: 200000 },
  'Frontend Developer': { Junior: 72000, Mid: 100000, Senior: 135000, Lead: 158000, Director: 190000 },
  'Backend Developer': { Junior: 74000, Mid: 103000, Senior: 138000, Lead: 162000, Director: 195000 },
  'Full Stack Developer': { Junior: 73000, Mid: 102000, Senior: 137000, Lead: 160000, Director: 192000 },
  'Data Scientist': { Junior: 80000, Mid: 115000, Senior: 150000, Lead: 175000, Director: 210000 },
  'Data Engineer': { Junior: 78000, Mid: 110000, Senior: 145000, Lead: 170000, Director: 205000 },
  'Data Analyst': { Junior: 68000, Mid: 92000, Senior: 120000, Lead: 145000, Director: 175000 },
  'Machine Learning Engineer': { Junior: 85000, Mid: 120000, Senior: 160000, Lead: 185000, Director: 220000 },
  'Product Manager': { Mid: 120000, Senior: 155000, Lead: 180000, Director: 200000, 'C-Level': 260000 },
  'Product Owner': { Junior: 80000, Mid: 105000, Senior: 135000, Lead: 160000 },
  'UX Designer': { Junior: 70000, Mid: 95000, Senior: 125000, Lead: 148000, Director: 175000 },
  'UI Designer': { Junior: 65000, Mid: 88000, Senior: 115000, Lead: 138000 },
  'UX/UI Designer': { Junior: 68000, Mid: 92000, Senior: 120000, Lead: 145000 },
  'DevOps Engineer': { Junior: 78000, Mid: 110000, Senior: 145000, Lead: 170000, Director: 200000 },
  'Cloud Engineer': { Junior: 80000, Mid: 112000, Senior: 148000, Lead: 172000, Director: 205000 },
  'Site Reliability Engineer': { Junior: 82000, Mid: 115000, Senior: 150000, Lead: 175000 },
  'Financial Analyst': { Junior: 70000, Mid: 95000, Senior: 125000, Lead: 150000, Director: 165000 },
  'Risk Manager': { Junior: 75000, Mid: 105000, Senior: 138000, Lead: 162000, Director: 185000 },
  'Investment Analyst': { Junior: 78000, Mid: 110000, Senior: 145000, Lead: 172000, Director: 200000 },
  'Marketing Manager': { Junior: 65000, Mid: 95000, Senior: 125000, Lead: 148000, Director: 160000 },
  'Digital Marketing Manager': { Junior: 62000, Mid: 88000, Senior: 118000, Lead: 142000, Director: 162000 },
  'HR Manager': { Junior: 65000, Mid: 90000, Senior: 118000, Lead: 140000, Director: 155000 },
  'Recruiter': { Junior: 58000, Mid: 78000, Senior: 102000, Lead: 125000 },
  'Project Manager': { Junior: 70000, Mid: 98000, Senior: 128000, Lead: 152000, Director: 175000 },
  'Business Analyst': { Junior: 68000, Mid: 92000, Senior: 120000, Lead: 145000, Director: 170000 },
  'Consultant': { Junior: 72000, Mid: 98000, Senior: 130000, Lead: 158000, Director: 190000 },
  'Sales Manager': { Junior: 68000, Mid: 95000, Senior: 125000, Lead: 148000, Director: 175000 },
  'Account Manager': { Junior: 62000, Mid: 82000, Senior: 108000, Lead: 130000 },
  'Architect': { Mid: 120000, Senior: 155000, Lead: 180000, Director: 210000 },
  'Solutions Architect': { Mid: 125000, Senior: 160000, Lead: 188000, Director: 220000 },
  'Cybersecurity Engineer': { Junior: 80000, Mid: 112000, Senior: 148000, Lead: 175000, Director: 205000 },
  'Network Engineer': { Junior: 72000, Mid: 98000, Senior: 128000, Lead: 152000 },
};

export const cantonMultipliers: Record<string, number> = {
  'Zürich': 1.15,
  'Zug': 1.12,
  'Geneva': 1.10,
  'Basel': 1.08,
  'Bern': 1.0,
  'Lausanne': 1.05,
  'Ticino': 0.82,
  'Lugano': 0.82,
  'St. Gallen': 0.95,
};

export const swissCompanies = [
  { name: 'Google Zürich', industry: 'Technology', size: 'Large', locations: ['Zürich'], avgSalaryMultiplier: 1.35, openPositions: 45 },
  { name: 'UBS', industry: 'Finance & Banking', size: 'Large', locations: ['Zürich', 'Geneva', 'Basel'], avgSalaryMultiplier: 1.20, openPositions: 62 },
  { name: 'Roche', industry: 'Pharmaceuticals', size: 'Large', locations: ['Basel', 'Zug'], avgSalaryMultiplier: 1.18, openPositions: 38 },
  { name: 'Novartis', industry: 'Pharmaceuticals', size: 'Large', locations: ['Basel', 'Zürich'], avgSalaryMultiplier: 1.17, openPositions: 41 },
  { name: 'ABB', industry: 'Manufacturing', size: 'Large', locations: ['Zürich', 'Baden'], avgSalaryMultiplier: 1.08, openPositions: 29 },
  { name: 'Nestlé', industry: 'Retail', size: 'Large', locations: ['Lausanne', 'Bern'], avgSalaryMultiplier: 1.06, openPositions: 25 },
  { name: 'Swisscom', industry: 'Technology', size: 'Large', locations: ['Bern', 'Zürich'], avgSalaryMultiplier: 1.05, openPositions: 33 },
  { name: 'Swiss Re', industry: 'Finance & Banking', size: 'Large', locations: ['Zürich'], avgSalaryMultiplier: 1.22, openPositions: 18 },
  { name: 'Zurich Insurance', industry: 'Finance & Banking', size: 'Large', locations: ['Zürich'], avgSalaryMultiplier: 1.14, openPositions: 22 },
  { name: 'SIX Group', industry: 'Finance & Banking', size: 'Medium', locations: ['Zürich'], avgSalaryMultiplier: 1.16, openPositions: 14 },
  { name: 'Julius Bär', industry: 'Finance & Banking', size: 'Medium', locations: ['Zürich'], avgSalaryMultiplier: 1.19, openPositions: 11 },
  { name: 'Lonza', industry: 'Pharmaceuticals', size: 'Large', locations: ['Basel', 'Visp'], avgSalaryMultiplier: 1.12, openPositions: 19 },
  { name: 'Givaudan', industry: 'Manufacturing', size: 'Large', locations: ['Geneva', 'Zürich'], avgSalaryMultiplier: 1.10, openPositions: 15 },
  { name: 'Schindler', industry: 'Manufacturing', size: 'Large', locations: ['Ebikon', 'Zürich'], avgSalaryMultiplier: 1.05, openPositions: 12 },
  { name: 'LafargeHolcim', industry: 'Manufacturing', size: 'Large', locations: ['Zürich', 'Zug'], avgSalaryMultiplier: 1.04, openPositions: 8 },
  { name: 'Swatch Group', industry: 'Manufacturing', size: 'Large', locations: ['Biel', 'Bern'], avgSalaryMultiplier: 1.02, openPositions: 10 },
  { name: 'Stadler Rail', industry: 'Manufacturing', size: 'Medium', locations: ['St. Gallen', 'Zürich'], avgSalaryMultiplier: 1.03, openPositions: 7 },
  { name: 'Sonova', industry: 'Pharmaceuticals', size: 'Medium', locations: ['Stäfa', 'Zürich'], avgSalaryMultiplier: 1.09, openPositions: 9 },
  { name: 'Straumann', industry: 'Pharmaceuticals', size: 'Medium', locations: ['Basel'], avgSalaryMultiplier: 1.11, openPositions: 11 },
  { name: 'Temenos', industry: 'Technology', size: 'Medium', locations: ['Geneva', 'Zürich'], avgSalaryMultiplier: 1.13, openPositions: 20 },
  { name: 'Credit Suisse (UBS)', industry: 'Finance & Banking', size: 'Large', locations: ['Zürich', 'Geneva'], avgSalaryMultiplier: 1.18, openPositions: 28 },
  { name: 'Helvetia', industry: 'Finance & Banking', size: 'Medium', locations: ['St. Gallen', 'Basel'], avgSalaryMultiplier: 1.05, openPositions: 8 },
  { name: 'Baloise', industry: 'Finance & Banking', size: 'Medium', locations: ['Basel', 'Zürich'], avgSalaryMultiplier: 1.06, openPositions: 9 },
  { name: 'PostFinance', industry: 'Finance & Banking', size: 'Large', locations: ['Bern'], avgSalaryMultiplier: 1.04, openPositions: 14 },
  { name: 'SBB', industry: 'Technology', size: 'Large', locations: ['Bern', 'Zürich'], avgSalaryMultiplier: 1.03, openPositions: 31 },
  { name: 'Migros', industry: 'Retail', size: 'Large', locations: ['Zürich', 'Bern', 'Geneva'], avgSalaryMultiplier: 0.98, openPositions: 20 },
  { name: 'Coop', industry: 'Retail', size: 'Large', locations: ['Basel', 'Zürich'], avgSalaryMultiplier: 0.97, openPositions: 17 },
  { name: 'Lindt', industry: 'Manufacturing', size: 'Medium', locations: ['Zürich', 'Aargau'], avgSalaryMultiplier: 1.05, openPositions: 6 },
  { name: 'KPMG Switzerland', industry: 'Consulting', size: 'Large', locations: ['Zürich', 'Geneva', 'Bern'], avgSalaryMultiplier: 1.15, openPositions: 24 },
  { name: 'Deloitte Switzerland', industry: 'Consulting', size: 'Large', locations: ['Zürich', 'Geneva', 'Bern'], avgSalaryMultiplier: 1.14, openPositions: 22 },
];

export const jobTaxonomy: Record<string, string[]> = {
  'Software Engineer': ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer'],
  'Data Scientist': ['Machine Learning Engineer', 'Data Analyst', 'Data Engineer', 'AI Researcher'],
  'Product Manager': ['Product Owner', 'Business Analyst', 'Project Manager'],
  'UX Designer': ['UI Designer', 'UX/UI Designer', 'Product Designer'],
  'DevOps Engineer': ['Cloud Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
  'Financial Analyst': ['Risk Manager', 'Investment Analyst', 'Controller'],
  'Marketing Manager': ['Digital Marketing Manager', 'Brand Manager', 'Growth Manager'],
  'HR Manager': ['Recruiter', 'Talent Acquisition Manager', 'People Operations Manager'],
};

function findBestSalaryMatch(title: string): Partial<Record<SeniorityLevel, number>> | null {
  const normalizedTitle = title.toLowerCase();
  for (const [key, data] of Object.entries(salaryData)) {
    if (key.toLowerCase() === normalizedTitle) return data;
  }
  for (const [key, data] of Object.entries(salaryData)) {
    if (normalizedTitle.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedTitle)) {
      return data;
    }
  }
  return null;
}

export function getSalaryRange(
  title: string,
  seniority: SeniorityLevel,
  canton: string
): { p25: number; p50: number; p75: number } {
  const multiplier = cantonMultipliers[canton] || 1.0;
  const match = findBestSalaryMatch(title);
  const baseSalary = match?.[seniority] || match?.['Mid'] || 100000;

  return {
    p25: Math.round(baseSalary * 0.85 * multiplier),
    p50: Math.round(baseSalary * multiplier),
    p75: Math.round(baseSalary * 1.18 * multiplier),
  };
}

export function getCompetitorCompanies(title: string, location: string): CompanyData[] {
  const normalizedTitle = title.toLowerCase();
  const normalizedLocation = location.toLowerCase();

  const industryMap: Record<string, string[]> = {
    Technology: ['developer', 'engineer', 'devops', 'cloud', 'data', 'machine learning', 'software', 'architect', 'cyber', 'network'],
    'Finance & Banking': ['financial', 'analyst', 'risk', 'investment', 'banker', 'finance'],
    Pharmaceuticals: ['pharma', 'biotech', 'clinical', 'regulatory', 'medical', 'lab'],
    Consulting: ['consultant', 'advisor', 'manager', 'project'],
    Retail: ['marketing', 'sales', 'account', 'brand'],
    Manufacturing: ['manufacturing', 'industrial', 'operations', 'supply'],
  };

  let targetIndustry = 'Technology';
  for (const [industry, keywords] of Object.entries(industryMap)) {
    if (keywords.some(k => normalizedTitle.includes(k))) {
      targetIndustry = industry;
      break;
    }
  }

  return swissCompanies
    .filter(c => {
      const industryMatch = c.industry === targetIndustry || c.industry.includes(targetIndustry);
      const locationMatch = c.locations.some(l => l.toLowerCase().includes(normalizedLocation) || normalizedLocation.includes(l.toLowerCase()));
      return industryMatch || locationMatch;
    })
    .slice(0, 8)
    .map(c => ({
      name: c.name,
      industry: c.industry,
      openPositions: c.openPositions,
      avgSalary: Math.round(105000 * c.avgSalaryMultiplier),
    }));
}

export function getSimilarRoles(title: string, seniority: SeniorityLevel, canton: string): SimilarRole[] {
  const related = jobTaxonomy[title] || [];
  const allRoles = [title, ...related].slice(0, 5);

  return allRoles.map(roleTitle => {
    const range = getSalaryRange(roleTitle, seniority, canton);
    return {
      title: roleTitle,
      salaryRange: `CHF ${Math.round(range.p25 / 1000)}k – ${Math.round(range.p75 / 1000)}k`,
      count: Math.floor(Math.random() * 80) + 10,
    };
  });
}
