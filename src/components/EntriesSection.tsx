import React from 'react';
import { Stats } from './Stats';
import { TimeList } from './TimeList';
import { TimeEntry, TimeStats } from '../types';

interface EntriesSectionProps {
  stats: TimeStats;
  entries: TimeEntry[];
  onDelete: (id: string) => void;
}

export function EntriesSection({ stats, entries, onDelete }: EntriesSectionProps) {
  return (
    <div className="space-y-8">
      <Stats stats={stats} />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Entries</h2>
        <TimeList entries={entries} onDelete={onDelete} />
      </div>
    </div>
  );
}