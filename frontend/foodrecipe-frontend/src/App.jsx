import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Cb from './components/cb';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ScrollToTop from './components/ScrollToTop';
import './styles/globals.css';

const RouteTransitionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <div className="animated-bg">
        <span className="blob w-72 h-72 rounded-full bg-orange-200 top-10 left-10"></span>
        <span className="blob w-80 h-80 rounded-full bg-red-200 bottom-10 right-10"></span>
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<RouteTransitionWrapper><HomePage /></RouteTransitionWrapper>} />
          <Route path="dashboard" element={<RouteTransitionWrapper><Dashboard /></RouteTransitionWrapper>} />
          <Route path="recipe/:id" element={<RouteTransitionWrapper><Cb /></RouteTransitionWrapper>} />
          <Route path="profile" element={<RouteTransitionWrapper><Profile /></RouteTransitionWrapper>} />
          <Route path="settings" element={<RouteTransitionWrapper><Settings /></RouteTransitionWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;