import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '../Common/Icons';

export const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="theme-toggle-icon"
      >
        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </motion.div>
    </button>
  );
};

