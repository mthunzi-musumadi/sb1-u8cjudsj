import React, { useState } from 'react';
import { TimeRange } from '../../types/analytics';
import { TimeEntry } from '../../types';
import { calculateEfficiencyByTimeRange, calculateAverageEfficiency } from '../../utils/analytics';
import { TimeRangeSelector } from './TimeRangeSelector';
import { EfficiencyGraph } from './EfficiencyGraph';
import { AverageEfficiencyCard } from './AverageEfficiencyCard';

interface EfficiencyAnalyticsProps {
  entries: TimeEntry[];
}

export function EfficiencyAnalytics({ entries }: EfficiencyAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const efficiencyData = calculateEfficiencyByTimeRange(entries, timeRange);
  const averageEfficiency = calculateAverageEfficiency(entries, timeRange);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Efficiency Analytics
        </h2>
        <TimeRangeSelector
          selected={timeRange}
          onChange={setTimeRange}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AverageEfficiencyCard data={averageEfficiency} />
        <EfficiencyGraph
          data={efficiencyData}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
}