import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../utils/theme';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <Link to="/" className="text-3xl font-bold" style={{ fontFamily: "'Rubik Bubbles', system-ui" }}>
        <span className="text-indigo-600">Tracker</span>
        <span className="text-gray-900 dark:text-white">Thon</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/analytics"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <BarChart2 size={20} />
          <span>Analytics</span>
        </Link>
        <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} />
      </div>
    </header>
  );
}