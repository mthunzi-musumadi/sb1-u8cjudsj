import React from 'react';
import { Square } from 'lucide-react';
import { Button } from './Button';

interface TimerProps {
  isRunning: boolean;
  elapsedTime: number;
  onStop: () => void;
}

export function Timer({ isRunning, elapsedTime, onStop }: TimerProps) {
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-6xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex space-x-4">
        <Button
          variant="danger"
          onClick={onStop}
          className="p-2 rounded-full"
        >
          <Square size={24} />
        </Button>
      </div>
    </div>
  );
}