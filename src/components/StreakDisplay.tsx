import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { StreakInfo } from '../types/streak';
import { updateStreak } from '../utils/streak';

export function StreakDisplay() {
  const [streak, setStreak] = useState<StreakInfo>(() => updateStreak());

  useEffect(() => {
    // Update streak when component mounts
    setStreak(updateStreak());

    // Update streak when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setStreak(updateStreak());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-orange-500">
      <Flame className="w-5 h-5" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {streak.currentStreak} day{streak.currentStreak !== 1 ? 's' : ''} streak
        </span>
        <span className="text-xs text-gray-500">
          Longest: {streak.longestStreak} day{streak.longestStreak !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}