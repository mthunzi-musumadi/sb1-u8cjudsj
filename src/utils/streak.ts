import { TimeEntry } from '../types';
import { StreakData } from '../types/streak';

const STREAK_KEY = 'trackerThon_streak';
const LAST_VISIT_KEY = 'trackerThon_lastVisit';

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const updateStreak = (entries: TimeEntry[]): StreakData => {
  const stored = localStorage.getItem(STREAK_KEY);
  let streak: StreakData = stored
    ? JSON.parse(stored)
    : {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        streakHistory: [],
      };

  const today = new Date().toISOString().split('T')[0];
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  
  // Update streak based on app visits
  if (!lastVisit) {
    streak.currentStreak = 1;
    streak.longestStreak = Math.max(1, streak.longestStreak);
    streak.streakHistory = [{ date: today, completed: true }];
  } else {
    const lastVisitDate = new Date(lastVisit);
    
    if (!isToday(lastVisitDate)) {
      if (isYesterday(lastVisitDate)) {
        streak.currentStreak += 1;
        streak.longestStreak = Math.max(streak.currentStreak, streak.longestStreak);
      } else {
        streak.currentStreak = 1;
      }
      streak.streakHistory.push({ date: today, completed: true });
    }
  }

  // Keep only last 30 days in history
  if (streak.streakHistory.length > 30) {
    streak.streakHistory = streak.streakHistory.slice(-30);
  }

  streak.lastActiveDate = today;
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());

  return streak;
};