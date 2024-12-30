import { StreakData, StreakInfo } from '../types/streak';
import { formatDate } from './dateTime';

const STREAK_KEY = 'focus_streak';

export function getInitialStreakData(): StreakData {
  return {
    currentStreak: 0,
    lastAccessDate: '',
    longestStreak: 0
  };
}

export function loadStreakData(): StreakData {
  const stored = localStorage.getItem(STREAK_KEY);
  if (!stored) {
    return getInitialStreakData();
  }
  return JSON.parse(stored);
}

export function saveStreakData(data: StreakData) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function updateStreak(): StreakInfo {
  const today = formatDate(new Date());
  const data = loadStreakData();
  
  // First time opening the app
  if (!data.lastAccessDate) {
    const newData = {
      currentStreak: 1,
      lastAccessDate: today,
      longestStreak: 1
    };
    saveStreakData(newData);
    return { ...newData, isToday: true };
  }

  // Already opened today
  if (data.lastAccessDate === today) {
    return { ...data, isToday: true };
  }

  // Check if last access was yesterday
  const lastAccess = new Date(data.lastAccessDate);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isConsecutiveDay = formatDate(lastAccess) === formatDate(yesterday);

  const newData = {
    currentStreak: isConsecutiveDay ? data.currentStreak + 1 : 1,
    lastAccessDate: today,
    longestStreak: Math.max(
      data.longestStreak,
      isConsecutiveDay ? data.currentStreak + 1 : 1
    )
  };

  saveStreakData(newData);
  return { ...newData, isToday: true };
}