import { TimeEntry } from '../types';
import { TimeRange, EfficiencyDataPoint, AverageEfficiency } from '../types/analytics';

const getDateKey = (date: Date, range: TimeRange): string => {
  switch (range) {
    case 'day':
      return date.toISOString().split('T')[0];
    case 'week':
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      return weekStart.toISOString().split('T')[0];
    case 'month':
      return date.toISOString().slice(0, 7);
    case 'year':
      return date.getFullYear().toString();
  }
};

export const calculateEfficiencyByTimeRange = (
  entries: TimeEntry[],
  range: TimeRange
): EfficiencyDataPoint[] => {
  const groupedData: Record<string, {
    productiveTime: number;
    totalTime: number;
  }> = {};

  entries.forEach(entry => {
    if (!entry.endTime) return;
    
    const dateKey = getDateKey(entry.startTime, range);
    const duration = (entry.endTime.getTime() - entry.startTime.getTime()) / 1000;
    const isProductive = entry.labels.includes('Productive');

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = { productiveTime: 0, totalTime: 0 };
    }

    groupedData[dateKey].totalTime += duration;
    if (isProductive) {
      groupedData[dateKey].productiveTime += duration;
    }
  });

  return Object.entries(groupedData).map(([date, data]) => ({
    date,
    efficiency: (data.productiveTime / data.totalTime) * 100,
    productiveTime: data.productiveTime,
    totalTime: data.totalTime
  })).sort((a, b) => a.date.localeCompare(b.date));
};

export const calculateAverageEfficiency = (
  entries: TimeEntry[],
  range: TimeRange
): AverageEfficiency => {
  const dataPoints = calculateEfficiencyByTimeRange(entries, range);
  
  if (dataPoints.length === 0) {
    return { average: 0, totalEntries: 0, timeRange: range };
  }

  const sum = dataPoints.reduce((acc, point) => acc + point.efficiency, 0);
  return {
    average: sum / dataPoints.length,
    totalEntries: dataPoints.length,
    timeRange: range
  };
};