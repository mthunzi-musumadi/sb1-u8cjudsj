import React, { useState } from 'react';
import { Play, Pause, Square, Check, X, Timer } from 'lucide-react';
import { Button } from './Button';
import { formatTime } from '../utils/time';

interface FocusTimerProps {
  isRunning: boolean;
  elapsedTime: number;
  targetTime: number;
  isProductive: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onToggleProductivity: () => void;
}

export function FocusTimer({
  isRunning,
  elapsedTime,
  targetTime,
  isProductive,
  onPause,
  onResume,
  onStop,
  onToggleProductivity,
}: FocusTimerProps) {
  const targetReached = elapsedTime >= targetTime;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-7xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          {formatTime(elapsedTime)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Target: {formatTime(targetTime)}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        {isRunning ? (
          <Button
            onClick={onPause}
            className="p-3 rounded-full"
            variant="secondary"
          >
            <Pause size={24} />
          </Button>
        ) : (
          <Button
            onClick={onResume}
            className="p-3 rounded-full"
            variant="primary"
          >
            <Play size={24} />
          </Button>
        )}
        <Button
          onClick={onStop}
          className="p-3 rounded-full"
          variant="danger"
        >
          <Square size={24} />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={onToggleProductivity}
          variant={isProductive ? 'primary' : 'danger'}
          className="px-4 py-2"
        >
          {isProductive ? 'Productive' : 'Unproductive'}
        </Button>
      </div>

      {elapsedTime > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <span>Target {targetReached ? 'Reached' : 'Not Reached'}</span>
          {targetReached ? (
            <Check className="text-green-500" size={16} />
          ) : (
            <X className="text-red-500" size={16} />
          )}
        </div>
      )}
    </div>
  );
}