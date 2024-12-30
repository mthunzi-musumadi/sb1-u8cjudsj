import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TimeList } from '../components/TimeList';
import { TimeEntry } from '../types';
import { ArrowLeft } from 'lucide-react';

interface EntriesPageProps {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
}

export function EntriesPage({ entries, onDelete }: EntriesPageProps) {
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Time Entries</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <TimeList entries={entries} onDelete={onDelete} />
      </div>
    </div>
  );
}