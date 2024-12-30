import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../utils/theme';

interface ThemeToggleProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function ThemeToggle({ theme, onThemeToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onThemeToggle}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}