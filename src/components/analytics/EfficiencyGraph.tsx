import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TimeRange, EfficiencyDataPoint } from '../../types/analytics';

interface EfficiencyGraphProps {
  data: EfficiencyDataPoint[];
  timeRange: TimeRange;
}

export function EfficiencyGraph({ data, timeRange }: EfficiencyGraphProps) {
  const formatDate = (date: string): string => {
    switch (timeRange) {
      case 'day':
        return new Date(date).toLocaleDateString();
      case 'week':
        return `Week of ${new Date(date).toLocaleDateString()}`;
      case 'month':
        return new Date(date + '-01').toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
      case 'year':
        return date;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Efficiency Trends
        </h3>
      </div>
      
      <div className="h-64 flex items-end gap-2">
        {data.map((point) => (
          <div
            key={point.date}
            className="flex-1 flex flex-col items-center"
          >
            <div 
              className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t"
              style={{ height: `${point.efficiency}%` }}
            />
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 transform -rotate-45 origin-top-left">
              {formatDate(point.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}