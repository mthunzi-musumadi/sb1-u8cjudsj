import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { StreakDisplay } from './StreakDisplay';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">Focus Timer</h1>
      <div className="flex items-center gap-4">
        <StreakDisplay />
        <ThemeToggle />
      </div>
    </header>
  );
}