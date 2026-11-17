import { useState, useEffect } from 'react';

/**
 * Hook to track which section is currently active using IntersectionObserver.
 * @param {Array<string>} sectionIds - List of HTML IDs to observe.
 * @param {Object} options - IntersectionObserver options.
 * @returns {string} activeId - The ID of the currently visible section.
 */
export function useActiveSection(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px', // Trigger when section occupies the upper-middle reading area
      threshold: [0, 0.25, 0.5, 0.75, 1],
      ...options
    };

    const visibleEntries = new Map();

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleEntries.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleEntries.delete(entry.target.id);
        }
      });

      // Find the entry with highest ratio or first visible entry
      if (visibleEntries.size > 0) {
        let maxRatio = -1;
        let mostVisibleId = activeId;
        visibleEntries.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        });
        setActiveId(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options, activeId]);

  return [activeId, setActiveId];
}

