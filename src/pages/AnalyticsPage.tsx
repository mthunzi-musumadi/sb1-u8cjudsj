import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LineChart } from 'lucide-react';
import { TimeEntry } from '../types';
import { EfficiencyAnalytics } from '../components/analytics/EfficiencyAnalytics';
import { ThreeDGraph } from '../components/analytics/ThreeDGraph';
import { calculateEfficiencyByTimeRange } from '../utils/analytics';

interface AnalyticsPageProps {
  entries: TimeEntry[];
}

export function AnalyticsPage({ entries }: AnalyticsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const weeklyData = calculateEfficiencyByTimeRange(entries, 'week');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft size={20} />
            <span>Back to Timer</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <LineChart size={20} />
          <span>Detailed Insights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ThreeDGraph data={weeklyData} />
        <EfficiencyAnalytics entries={entries} />
      </div>
    </div>
  );
}