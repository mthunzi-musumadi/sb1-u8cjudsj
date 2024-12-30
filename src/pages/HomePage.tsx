import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListTodo, Trophy } from 'lucide-react';
import { TimerSection } from '../components/TimerSection';
import { Stats } from '../components/Stats';
import { EfficiencyCard } from '../components/EfficiencyCard';
import { StreakDisplay } from '../components/StreakDisplay';
import { EfficiencyAnalytics } from '../components/analytics/EfficiencyAnalytics';
import { TimeEntry, TimeStats } from '../types';
import { StreakData } from '../types/streak';
import { calculateEfficiency } from '../utils/efficiency';

interface HomePageProps {
  currentEntry: TimeEntry | null;
  elapsedTime: number;
  onStop: () => void;
  onStart: (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => void;
  stats: TimeStats;
  entries: TimeEntry[];
  streak: StreakData;
}

export function HomePage({
  currentEntry,
  elapsedTime,
  onStop,
  onStart,
  stats,
  entries,
  streak
}: HomePageProps) {
  const efficiencyStats = calculateEfficiency(entries);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <StreakDisplay streak={streak} />
          <TimerSection
            currentEntry={currentEntry}
            elapsedTime={elapsedTime}
            onStop={onStop}
            onStart={onStart}
          />
        </div>
        <div className="space-y-4">
          <Stats stats={stats} />
          <EfficiencyCard stats={efficiencyStats} />
          <div className="flex gap-4">
            <Link
              to="/entries"
              className="flex items-center justify-center gap-2 flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ListTodo size={20} />
              <span>View Entries</span>
            </Link>
            <Link
              to="/milestones"
              className="flex items-center justify-center gap-2 flex-1 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Trophy size={20} />
              <span>Milestones</span>
            </Link>
          </div>
        </div>
      </div>
      
      <EfficiencyAnalytics entries={entries} />
    </div>
  );
}