import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ScrollProvider } from './contexts/ScrollContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

const PageFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center" aria-label="Loading">
    <div className="w-10 h-10 border-2 border-neon-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Main App Component
 * Entry point for the Gen-Z Creative Agency website
 * Uses route-based code splitting for faster initial load
 */
const App: React.FC = () => {
  return (
    <ScrollProvider>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<PageFallback />}>
              <PortfolioPage />
            </Suspense>
          }
        />
      </Routes>
    </ScrollProvider>
  );
};

export default App;