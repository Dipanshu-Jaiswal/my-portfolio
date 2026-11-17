import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const finishLoader = useCallback(() => {
    setIsFinished(true);
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Fast high-end counter 0 to 100 in ~1.4s
    const startTime = Date.now();
    const duration = 1350;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(finishLoader, 200);
      }
    }, 24);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') finishLoader();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishLoader]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="creative-loader-overlay"
          initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          exit={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          }}
          onClick={finishLoader}
          title="Click to skip"
        >
          {/* Top subtle brand bar */}
          <div className="loader-top-bar">
            <span className="loader-tag">FULL-STACK DEVELOPER</span>
            <span className="loader-location">INDORE / UJJAIN • INDIA</span>
          </div>

          {/* Central Monogram & Number Counter */}
          <div className="loader-center-content">
            <motion.div
              className="loader-monogram-box"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="loader-initials">DJ</span>
              <span className="loader-accent-dot" />
            </motion.div>

            <div className="loader-counter-row">
              <span className="loader-counter-num">{progress.toString().padStart(2, '0')}</span>
              <span className="loader-counter-symbol">%</span>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="loader-bottom-track">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="loader-skip-hint">PRESS ESC OR CLICK TO SKIP</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
