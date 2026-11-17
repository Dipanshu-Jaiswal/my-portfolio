import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const TiltCard = ({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  perspective = 1000,
  glow = true,
  onClick
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  }, [maxTilt, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      whileHover={reducedMotion ? {} : { scale }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="tilt-card-content">
        {children}
        {glow && !reducedMotion && (
          <div
            className="tilt-card-glow"
            style={{
              background: `radial-gradient(circle 280px at ${glowPos.x}% ${glowPos.y}%, var(--primary-glow), transparent 70%)`,
              opacity: glowPos.opacity
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  );
};

