import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from '../Common/TiltCard';
import { ProjectSignaturePreview } from './SignatureMotions';
import { GithubIcon, ExternalLinkIcon, EyeIcon } from '../Common/Icons';

export const ProjectCard = ({ project, onSelectProject }) => {
  const isFeatured = project.featured;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card-column ${isFeatured ? 'featured-column' : ''}`}
    >
      <TiltCard maxTilt={8} scale={1.01} className={`project-tilt-card ${isFeatured ? 'featured-card' : ''}`}>
        <div className="project-card-wrapper">
          {/* Card Top: Signature Interactive Preview */}
          <div className="project-card-preview-area">
            <ProjectSignaturePreview signatureType={project.signatureType} />
            <div className="project-badge-row">
              <span className="project-category-tag">{project.category}</span>
              {isFeatured && <span className="project-featured-tag">★ Featured</span>}
            </div>
          </div>

          {/* Card Body */}
          <div className="project-card-body">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-tagline">{project.tagline}</p>

            <p className="project-brief-description">
              {project.description.length > 140
                ? `${project.description.substring(0, 140)}...`
                : project.description}
            </p>

            {/* Tech Chips */}
            <div className="project-tech-chips">
              {project.techStack.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="tech-chip">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className="tech-chip-more">+{project.techStack.length - 5}</span>
              )}
            </div>

            {/* Key Features Preview (for featured cards) */}
            {isFeatured && (
              <ul className="project-feature-bullets">
                {project.features.slice(0, 2).map((feat, fIdx) => (
                  <li key={fIdx}>
                    <span className="bullet-point">▸</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Card Actions */}
            <div className="project-card-actions">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="btn btn-sm secondary"
                aria-label={`View full details of ${project.title}`}
              >
                <EyeIcon size={16} />
                <span>View Details</span>
              </button>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm outline"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              ) : null}

              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm primary"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLinkIcon size={16} />
                  <span>Demo</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

