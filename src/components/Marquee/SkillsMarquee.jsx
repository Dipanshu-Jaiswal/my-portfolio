import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const MARQUEE_ITEMS = [
  'REACT.JS',
  'NODE.JS',
  'EXPRESS.JS',
  'MONGODB',
  'JAVA (DSA)',
  'SQL & MYSQL',
  'JAVASCRIPT ES6+',
  'REST APIS',
  'GIT & GITHUB',
  'ARDUINO IOT',
  'TAILWIND CSS',
  'FULL-STACK MERN'
];

export const SkillsMarquee = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let currentX = 0;
    let baseSpeed = 0.8;
    let scrollSpeedMultiplier = 1;
    let animationFrameId;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      // Boost speed briefly on scroll velocity
      scrollSpeedMultiplier = Math.min(4, 1 + delta * 0.08);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smoothly decay multiplier back to 1
      scrollSpeedMultiplier += (1 - scrollSpeedMultiplier) * 0.05;

      currentX -= baseSpeed * scrollSpeedMultiplier;

      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(currentX) >= halfWidth) {
          currentX = 0;
        }
        trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion]);

  // Duplicate items for continuous seamless loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div ref={containerRef} className="skills-marquee-wrapper" aria-hidden="true">
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />
      <div ref={trackRef} className="skills-marquee-track">
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-star">✦</span>
            <span className="marquee-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

