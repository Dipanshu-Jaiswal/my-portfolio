import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, GithubIcon, ExternalLinkIcon, CheckIcon } from '../Common/Icons';
import { ProjectSignaturePreview } from './SignatureMotions';
import { getLenis } from '../../hooks/useLenis';

export const ProjectDetailsModal = ({ project, onClose, triggerElement }) => {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Save previously focused element to restore on close
    previouslyFocusedElement.current = triggerElement || document.activeElement;

    // Pause Lenis smooth scroll and lock body
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    // Focus first interactive element in modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    // Keyboard handlers: Escape to close and Tab focus trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (lenis) lenis.start();

      // Return focus to trigger element on close
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [project, onClose, triggerElement]);

  if (!project) return null;

  const titleId = `project-modal-title-${project.id}`;

  return (
    <AnimatePresence>
      <div
        className="modal-backdrop-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <motion.div
          ref={modalRef}
          className="project-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
            scale: 0.9,
            clipPath: 'inset(8% 8% 8% 8% round 16px)'
          }}
          animate={{
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 12px)'
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            clipPath: 'inset(8% 8% 8% 8% round 16px)'
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div>
              <div className="project-modal-tags">
                <span className="row-category-pill">{project.category}</span>
                {project.featured && <span className="row-featured-pill">★ FEATURED</span>}
                {project.client && <span className="row-client-pill">{project.client}</span>}
              </div>
              <h3 id={titleId} className="modal-title">{project.title}</h3>
              <p className="modal-subtitle">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close Project Details (Esc)"
              title="Close (Esc)"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="project-modal-body">
            {/* Signature Motion / Preview Banner */}
            <div className="project-modal-preview">
              <ProjectSignaturePreview signatureType={project.signatureType || project.previewType} />
            </div>

            {/* Overview */}
            <div className="project-modal-section">
              <h4>Project Overview</h4>
              <p className="project-modal-desc">{project.description}</p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="project-modal-section">
                <h4>Key Features & Architecture</h4>
                <ul className="project-features-list">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <div className="feature-check"><CheckIcon size={14} /></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Tech Stack */}
            <div className="project-modal-section">
              <h4>Technologies & Libraries</h4>
              <div className="project-tech-chips-modal">
                {(project.tech || project.techStack || []).map((t, idx) => (
                  <span key={idx} className="tech-chip tech-chip-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions: only show buttons that exist */}
          <div className="modal-footer">
            <div className="modal-footer-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  <GithubIcon size={18} />
                  <span>View Repository</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <ExternalLinkIcon size={18} />
                  <span>Live Demo</span>
                </a>
              )}
              {!project.github && !project.demo && (
                <span className="text-muted-notice">Source code and architecture diagrams available on request</span>
              )}
            </div>
            <button onClick={onClose} className="btn btn-outline">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
