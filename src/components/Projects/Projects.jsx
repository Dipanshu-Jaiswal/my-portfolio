import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectRow } from './ProjectRow';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { projectsData, projectCategories } from '../../data/projects';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [triggerElement, setTriggerElement] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Refresh ScrollTrigger when category filter changes to prevent height jumps
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleSelectProject = (project, element) => {
    setTriggerElement(element);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Pre-header */}
        <div className="section-pre-header">
          <span className="section-tag-num">04</span>
          <span className="section-tag-text">SELECTED WORK</span>
        </div>

        <div className="projects-header-row">
          <div>
            <h2 className="projects-section-title">
              FEATURED <span className="title-accent">PROJECTS</span>.
            </h2>
            <p className="projects-header-desc">
              Full-stack platforms, machine learning systems, and hardware engineering projects built with modern frameworks and clean architecture.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="project-filter-tabs-wrapper">
            <div className="filter-tabs-container" role="tablist" aria-label="Project Categories">
              {projectCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectFilter"
                        className="filter-active-indicator"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Devix-Style Stacked Project Rows */}
        <div className="projects-stacked-container">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={idx}
                onSelectProject={handleSelectProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          triggerElement={triggerElement}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
