import React from 'react';
import { Clock, Tag } from 'lucide-react';
import { TimeEntry } from '../types';
import { formatTime } from '../utils/time';

interface EntryContainerProps {
  entry: TimeEntry | null;
}

export function EntryContainer({ entry }: EntryContainerProps) {
  if (!entry) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Current Entry
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{entry.title}</h4>
          {entry.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {entry.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Started at: {new Date(entry.startTime).toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded text-sm">
            {entry.category}
          </span>
          {entry.labels.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded text-sm"
            >
              <Tag size={14} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}