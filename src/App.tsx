import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ScrollToTop from './components/ScrollToTop';

/**
 * Main App Component
 * Entry point for the Gen-Z Creative Agency website
 */
const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
    </Routes>
    </>
  );
};

export default App;