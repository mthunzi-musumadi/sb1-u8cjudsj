export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface EfficiencyDataPoint {
  date: string;
  efficiency: number;
  productiveTime: number;
  totalTime: number;
}

export interface AverageEfficiency {
  average: number;
  totalEntries: number;
  timeRange: TimeRange;
}