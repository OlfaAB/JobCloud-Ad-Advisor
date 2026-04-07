export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ExtractedFields {
  jobTitle?: string;
  location?: string;
  urgency?: 'Immediate' | '2 weeks' | '1 month' | '3 months' | 'No rush';
  seniority?: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Director' | 'C-Level';
  industry?: string;
  department?: string;
  keyRequirements?: string[];
}

export interface MarketData {
  salaryP25: number;
  salaryP50: number;
  salaryP75: number;
  similarRoles: SimilarRole[];
  competitorCompanies: CompanyData[];
  talentScarcity: number;
  competitionScore: number;
  hiringDifficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
}

export interface SimilarRole {
  title: string;
  salaryRange: string;
  count: number;
}

export interface CompanyData {
  name: string;
  industry: string;
  openPositions: number;
  avgSalary: number;
}

export interface SalaryData {
  canton: string;
  p25: number;
  p50: number;
  p75: number;
}

export interface PricingResult {
  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;
  reasoning: string[];
  breakdown: {
    basePrice: number;
    locationMultiplier: number;
    urgencyMultiplier: number;
    seniorityMultiplier: number;
  };
}

export interface PerformanceMetrics {
  estimatedViews: number;
  estimatedClicks: number;
  estimatedApplications: number;
  qualifiedCandidates: number;
  estimatedInterviews: number;
  estimatedHires: number;
  timeToHireDays: number;
  costPerApplication: number;
  dailyProjections: DailyProjection[];
}

export interface DailyProjection {
  day: number;
  views: number;
  applications: number;
}

export interface JobSession {
  id: string;
  title: string;
  status: 'Draft' | 'In Progress' | 'Analyzing' | 'Priced' | 'Published' | 'Offline';
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
  extractedFields: ExtractedFields;
  marketData?: MarketData;
  pricingResult?: PricingResult;
  performanceMetrics?: PerformanceMetrics;
  selectedPrice?: number;
  phase: number;
}
