import { TimeEntry } from '../types';

const STORAGE_KEY = 'trackerThon_entries';

export const loadEntries = (): TimeEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const entries = JSON.parse(stored);
    // Convert ISO date strings back to Date objects
    return entries.map((entry: any) => ({
      ...entry,
      startTime: new Date(entry.startTime),
      endTime: entry.endTime ? new Date(entry.endTime) : undefined
    }));
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
};

export const saveEntries = (entries: TimeEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries:', error);
  }
};