export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakHistory: { date: string; completed: boolean }[];
}