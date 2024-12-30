import React from 'react';
import { Timer } from './Timer';
import { EntryForm } from './EntryForm';
import { TimeEntry } from '../types';

interface TimerSectionProps {
  currentEntry: TimeEntry | null;
  elapsedTime: number;
  onStop: () => void;
  onStart: (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => void;
}

export function TimerSection({ currentEntry, elapsedTime, onStop, onStart }: TimerSectionProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Current Timer</h2>
        <Timer
          isRunning={currentEntry?.isRunning || false}
          elapsedTime={elapsedTime}
          onStop={onStop}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">New Time Entry</h2>
        <EntryForm onSubmit={onStart} />
      </div>
    </div>
  );
}