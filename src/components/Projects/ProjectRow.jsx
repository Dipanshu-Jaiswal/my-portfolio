import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProjectSignaturePreview } from './SignatureMotions';
import { GithubIcon, ExternalLinkIcon, ArrowRightIcon } from '../Common/Icons';

export const ProjectRow = ({ project, index, onSelectProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rowRef = useRef(null);

  const formattedNum = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={rowRef}
      className={`project-row-item ${project.featured ? 'project-row-featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Desktop Floating Cursor-Following Preview Card */}
      <div
        className={`project-row-floating-preview ${isHovered ? 'preview-visible' : ''}`}
        style={{
          transform: `translate3d(${mousePos.x + 30}px, ${mousePos.y - 100}px, 0)`
        }}
        aria-hidden="true"
      >
        <div className="preview-floating-inner">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="preview-floating-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectSignaturePreview signatureType={project.signatureType || project.previewType} />
          )}
        </div>
      </div>

      {/* Main Row Content (Desktop & Mobile) */}
      <div className="project-row-main" onClick={() => onSelectProject(project, rowRef.current)}>
        <div className="project-row-left">
          <span className="project-row-number">{formattedNum}</span>
          <div>
            <div className="project-row-title-wrap">
              <h3 className="project-row-title">{project.title}</h3>
              <div className="project-row-pills">
                <span className="row-category-pill">{project.category}</span>
                {project.featured && <span className="row-featured-pill">★ FEATURED</span>}
              </div>
            </div>
            <p className="project-row-desc">{project.description}</p>

            <div className="project-row-tech">
              {(project.tech || project.techStack || []).slice(0, 5).map((t, idx) => (
                <span key={idx} className="tech-chip">
                  {t}
                </span>
              ))}
              {(project.tech || project.techStack || []).length > 5 && (
                <span className="tech-chip-more">
                  +{(project.tech || project.techStack || []).length - 5}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile-only Preview Box */}
        <div className="project-row-mobile-preview">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="preview-mobile-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectSignaturePreview signatureType={project.signatureType || project.previewType} />
          )}
        </div>

        {/* Right Action Trigger */}
        <div className="project-row-right">
          <div className="row-action-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="row-link-btn"
                onClick={(e) => e.stopPropagation()}
                title="View on GitHub"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon size={17} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="row-link-btn"
                onClick={(e) => e.stopPropagation()}
                title="View Live Demo"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLinkIcon size={17} />
              </a>
            )}
            <button
              type="button"
              className="row-expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project, rowRef.current);
              }}
              aria-label={`Open details for ${project.title}`}
            >
              <span>DETAILS</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Underline Wipe Line */}
      <div className="project-row-underline" />
    </motion.div>
  );
};

