export interface StreakData {
  currentStreak: number;
  lastAccessDate: string;
  longestStreak: number;
}

export interface StreakInfo extends StreakData {
  isToday: boolean;
}