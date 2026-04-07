import { PricingResult, PerformanceMetrics, DailyProjection } from '../types';

export function calculatePerformanceMetrics(price: number, pricingResult: PricingResult): PerformanceMetrics {
  const priceRatio = price / pricingResult.recommendedPrice;

  const baseViews = Math.round(500 + (price / 5000) * 4500);
  const baseClicks = Math.round(baseViews * 0.12);
  const baseApplications = Math.round(baseClicks * 0.25);
  const qualifiedCandidates = Math.round(baseApplications * 0.4);
  const estimatedInterviews = Math.round(qualifiedCandidates * 0.5);
  const estimatedHires = Math.max(1, Math.round(estimatedInterviews * 0.3));

  const timeToHireDays = Math.max(7, Math.round(45 - priceRatio * 15));
  const costPerApplication = baseApplications > 0 ? Math.round(price / baseApplications) : price;

  const dailyProjections: DailyProjection[] = Array.from({ length: 30 }, (_, i) => {
    const decayFactor = Math.exp(-0.08 * i);
    const views = Math.round((baseViews / 30) * 2.5 * decayFactor + (baseViews / 30) * 0.3);
    const applications = Math.round((baseApplications / 30) * 2.5 * decayFactor + (baseApplications / 30) * 0.1);
    return { day: i + 1, views, applications };
  });

  return {
    estimatedViews: baseViews,
    estimatedClicks: baseClicks,
    estimatedApplications: baseApplications,
    qualifiedCandidates,
    estimatedInterviews,
    estimatedHires,
    timeToHireDays,
    costPerApplication,
    dailyProjections,
  };
}
