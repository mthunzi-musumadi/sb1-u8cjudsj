import React from 'react';
import { TrendingUp } from 'lucide-react';
import { AverageEfficiency } from '../../types/analytics';

interface AverageEfficiencyCardProps {
  data: AverageEfficiency;
}

export function AverageEfficiencyCard({ data }: AverageEfficiencyCardProps) {
  const formatTimeRange = (range: string): string => {
    return range.charAt(0).toUpperCase() + range.slice(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Average Efficiency ({formatTimeRange(data.timeRange)})
        </h3>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
          {data.average.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Based on {data.totalEntries} {data.timeRange}s of data
        </div>
      </div>
    </div>
  );
}