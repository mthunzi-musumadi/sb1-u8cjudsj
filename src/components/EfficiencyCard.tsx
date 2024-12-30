import React from 'react';
import { Gauge } from 'lucide-react';
import { EfficiencyStats } from '../utils/efficiency';

interface EfficiencyCardProps {
  stats: EfficiencyStats;
}

export function EfficiencyCard({ stats }: EfficiencyCardProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Efficiency Score
        </h3>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32">
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
            <circle
              className="text-indigo-600 dark:text-indigo-400"
              strokeWidth="12"
              strokeDasharray={360}
              strokeDashoffset={360 - (stats.productivePercentage / 100) * 360}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(stats.efficiencyScore)}%
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Productive Time</span>
          <span className="font-medium text-green-600 dark:text-green-400">
            {formatTime(stats.productiveTime)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Unproductive Time</span>
          <span className="font-medium text-red-600 dark:text-red-400">
            {formatTime(stats.unproductiveTime)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total Time</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatTime(stats.totalTime)}
          </span>
        </div>
      </div>
    </div>
  );
}