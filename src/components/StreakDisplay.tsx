import React from 'react';
import { Flame } from 'lucide-react';
import { StreakData } from '../types/streak';

interface StreakDisplayProps {
  streak: StreakData;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center gap-3 mb-4">
        <Flame className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Streak</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">{streak.currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">{streak.longestStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto py-2">
        {streak.streakHistory.slice(-7).map((day, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-md flex items-center justify-center ${
              day.completed
                ? 'bg-orange-100 dark:bg-orange-900'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-sm ${
                day.completed
                  ? 'bg-orange-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}