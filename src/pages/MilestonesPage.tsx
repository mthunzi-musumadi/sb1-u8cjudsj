import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TimeStats } from '../types';
import { MilestoneBadge } from '../components/MilestoneBadge';

interface MilestonesPageProps {
  stats: TimeStats;
}

const MILESTONES = [
  { minutes: 60, name: "Time Wanderer", description: "First 60 minutes of focused work" },
  { minutes: 720, name: "Chronos Apprentice", description: "720 minutes of dedication" },
  { minutes: 1440, name: "Day Walker", description: "1440 minutes of focus" },
  { minutes: 10080, name: "Week Warrior", description: "Conquered 10,080 minutes" },
  { minutes: 40320, name: "Monthly Maven", description: "Master of 40,320 minutes" },
  { minutes: 525600, name: "Time Lord", description: "Achieved 525,600 minutes" }
];

export function MilestonesPage({ stats }: MilestonesPageProps) {
  const totalMinutes = Math.floor(stats.totalTime / 60);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to Timer</span>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievement Milestones</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MILESTONES.map((milestone) => (
          <MilestoneBadge
            key={milestone.minutes}
            milestone={milestone}
            achieved={totalMinutes >= milestone.minutes}
            currentMinutes={totalMinutes}
          />
        ))}
      </div>
    </div>
  );
}