import React from 'react';
import { Award, Lock } from 'lucide-react';

interface MilestoneBadgeProps {
  milestone: {
    minutes: number;
    name: string;
    description: string;
  };
  achieved: boolean;
  currentMinutes: number;
}

export function MilestoneBadge({ milestone, achieved, currentMinutes }: MilestoneBadgeProps) {
  const progress = Math.min((currentMinutes / milestone.minutes) * 100, 100);
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    return `${Math.floor(minutes / 1440)}d ${Math.floor((minutes % 1440) / 60)}h`;
  };

  return (
    <div className={`p-6 rounded-lg shadow-md transition-all ${
      achieved 
        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
        : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-xl font-bold ${achieved ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {milestone.name}
          </h3>
          <p className={`text-sm mt-1 ${achieved ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {milestone.description}
          </p>
        </div>
        {achieved ? (
          <Award className="w-8 h-8 text-yellow-300" />
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className={achieved ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}>
            Progress
          </span>
          <span className={achieved ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}>
            {formatTime(currentMinutes)}/{formatTime(milestone.minutes)}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              achieved ? 'bg-yellow-300' : 'bg-indigo-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}