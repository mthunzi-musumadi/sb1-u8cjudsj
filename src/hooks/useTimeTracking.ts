import { useState, useEffect } from 'react';
import { TimeEntry, TimeStats } from '../types';
import { loadEntries, saveEntries } from '../utils/storage';
import { playButtonSound } from '../utils/sound';
import { updateStreak } from '../utils/streak';
import { StreakData } from '../types/streak';

export function useTimeTracking() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    streakHistory: [],
  });

  useEffect(() => {
    let interval: number;
    if (currentEntry?.isRunning) {
      const startTime = Date.now() - (elapsedTime * 1000);
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentEntry?.isRunning, elapsedTime]);

  useEffect(() => {
    const updatedStreak = updateStreak(entries);
    setStreak(updatedStreak);
  }, [entries]);

  const calculateStats = (): TimeStats => {
    const stats: TimeStats = {
      totalTime: 0,
      categoryBreakdown: {},
      labelBreakdown: {},
    };

    entries.forEach((entry) => {
      if (!entry.endTime) return;
      
      const duration = (entry.endTime.getTime() - entry.startTime.getTime()) / 1000;
      stats.totalTime += duration;

      // Update category breakdown
      stats.categoryBreakdown[entry.category] = 
        (stats.categoryBreakdown[entry.category] || 0) + duration;

      // Update label breakdown
      entry.labels.forEach((label) => {
        stats.labelBreakdown[label] = 
          (stats.labelBreakdown[label] || 0) + duration;
      });
    });

    return stats;
  };

  const handleStart = (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => {
    playButtonSound();
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      startTime: new Date(),
      isRunning: true,
      ...data,
    };
    setCurrentEntry(newEntry);
    setElapsedTime(0);
  };

  const handleStop = () => {
    playButtonSound();
    if (currentEntry) {
      const completedEntry: TimeEntry = {
        ...currentEntry,
        isRunning: false,
        endTime: new Date(),
      };
      setEntries([completedEntry, ...entries]);
      setCurrentEntry(null);
      setElapsedTime(0);
      saveEntries([completedEntry, ...entries]);
    }
  };

  const handleDelete = (id: string) => {
    playButtonSound();
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return {
    entries,
    setEntries,
    currentEntry,
    elapsedTime,
    streak,
    stats: calculateStats(),
    handleStart,
    handleStop,
    handleDelete,
  };
}