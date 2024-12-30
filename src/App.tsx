import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './utils/theme';
import { usePermissions } from './hooks/usePermissions';
import { useTimeTracking } from './hooks/useTimeTracking';
import { loadEntries } from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EntriesPage } from './pages/EntriesPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PermissionDialog } from './components/PermissionDialog';
import { PageTransition } from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { permissions, showDialog, requestPermissions } = usePermissions();
  const {
    entries,
    setEntries,
    currentEntry,
    elapsedTime,
    stats,
    streak,
    handleStart,
    handleStop,
    handleDelete,
  } = useTimeTracking();

  useEffect(() => {
    if (permissions?.storage) {
      setEntries(loadEntries());
    }
  }, [permissions?.storage, setEntries]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto p-6">
        <Header theme={theme} onThemeToggle={toggleTheme} />
        
        {showDialog ? (
          <PermissionDialog onRequestPermissions={requestPermissions} />
        ) : (
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={
                  <PageTransition>
                    <HomePage
                      currentEntry={currentEntry}
                      elapsedTime={elapsedTime}
                      onStop={handleStop}
                      onStart={handleStart}
                      stats={stats}
                      entries={entries}
                      streak={streak}
                    />
                  </PageTransition>
                } 
              />
              <Route 
                path="/entries" 
                element={
                  <PageTransition>
                    <EntriesPage
                      entries={entries}
                      onDelete={handleDelete}
                    />
                  </PageTransition>
                } 
              />
              <Route 
                path="/milestones" 
                element={
                  <PageTransition>
                    <MilestonesPage
                      stats={stats}
                    />
                  </PageTransition>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <PageTransition>
                    <AnalyticsPage entries={entries} />
                  </PageTransition>
                } 
              />
            </Routes>
          </AnimatePresence>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}