import React from 'react';
import { Timer } from 'lucide-react';

interface TargetTimeInputProps {
  targetHours: number;
  targetMinutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

export function TargetTimeInput({
  targetHours,
  targetMinutes,
  onHoursChange,
  onMinutesChange,
}: TargetTimeInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Timer size={20} />
        <span>Set Target Time</span>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Hours
          </label>
          <input
            type="number"
            min="0"
            max="23"
            value={targetHours}
            onChange={(e) => onHoursChange(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Minutes
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={targetMinutes}
            onChange={(e) => onMinutesChange(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}