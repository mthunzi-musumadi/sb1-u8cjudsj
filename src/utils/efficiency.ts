import { TimeEntry } from '../types';

export interface EfficiencyStats {
  productiveTime: number;
  unproductiveTime: number;
  totalTime: number;
  efficiencyScore: number;
  productivePercentage: number;
}

export const calculateEfficiency = (entries: TimeEntry[]): EfficiencyStats => {
  const stats = entries.reduce(
    (acc, entry) => {
      if (!entry.endTime) return acc;
      
      const duration = (entry.endTime.getTime() - entry.startTime.getTime()) / 1000;
      const isProductive = entry.labels.includes('Productive');
      
      return {
        productiveTime: acc.productiveTime + (isProductive ? duration : 0),
        unproductiveTime: acc.unproductiveTime + (!isProductive ? duration : 0),
        totalTime: acc.totalTime + duration,
      };
    },
    { productiveTime: 0, unproductiveTime: 0, totalTime: 0 }
  );

  const efficiencyScore = stats.totalTime > 0 
    ? (stats.productiveTime / stats.totalTime) * 100 
    : 0;

  return {
    ...stats,
    efficiencyScore,
    productivePercentage: Math.round(efficiencyScore),
  };
};