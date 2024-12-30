import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FocusTimer } from '../components/FocusTimer';
import { TargetTimeInput } from '../components/TargetTimeInput';
import { EntryContainer } from '../components/EntryContainer';
import { TimeEntry } from '../types';
import { EntryForm } from '../components/EntryForm';

interface FocusModePageProps {
  currentEntry: TimeEntry | null;
  elapsedTime: number;
  isRunning: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: (targetReached: boolean, isProductive: boolean) => void;
  onStart: (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => void;
}

export function FocusModePage({
  currentEntry,
  elapsedTime,
  isRunning,
  onPause,
  onResume,
  onStop,
  onStart,
}: FocusModePageProps) {
  const [targetHours, setTargetHours] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [isProductive, setIsProductive] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const targetTime = (targetHours * 3600) + (targetMinutes * 60);

  const handleStop = () => {
    onStop(elapsedTime >= targetTime, isProductive);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to Timer</span>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Focus Mode</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <FocusTimer
              isRunning={isRunning}
              elapsedTime={elapsedTime}
              targetTime={targetTime}
              isProductive={isProductive}
              onPause={onPause}
              onResume={onResume}
              onStop={handleStop}
              onToggleProductivity={() => setIsProductive(!isProductive)}
            />
          </div>
          
          {!currentEntry && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                New Focus Session
              </h3>
              <EntryForm onSubmit={onStart} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <TargetTimeInput
              targetHours={targetHours}
              targetMinutes={targetMinutes}
              onHoursChange={setTargetHours}
              onMinutesChange={setTargetMinutes}
            />
          </div>
          
          <EntryContainer entry={currentEntry} />
        </div>
      </div>
    </div>
  );
}