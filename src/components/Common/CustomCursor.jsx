import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice || reducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const checkHoverTarget = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover, .project-row-item, .card-interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', checkHoverTarget);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHoverTarget);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, reducedMotion]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 3.5,
          y: mousePosition.y - 3.5,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 500, mass: 0.1 }}
      />
      {/* Trailing Accent Follower Ring */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - (isHovering ? 26 : 14),
          y: mousePosition.y - (isHovering ? 26 : 14),
          width: isHovering ? 52 : 28,
          height: isHovering ? 52 : 28,
          borderColor: isHovering ? 'var(--accent)' : 'rgba(198, 255, 61, 0.4)',
          backgroundColor: isHovering ? 'var(--accent-dim)' : 'transparent'
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 280, mass: 0.2 }}
      />
    </>
  );
};
