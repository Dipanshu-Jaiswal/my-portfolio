import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { DownloadIcon, CheckIcon, EyeIcon, ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from '../Common/Icons';
import { personalInfo } from '../../data/skills';

// Lazy load Three.js WebGL scene to keep initial JS bundle ultra-fast
const HeroScene3D = lazy(() =>
  import('./HeroScene3D').then((m) => ({ default: m.HeroScene3D }))
);

export const Hero = ({ onOpenResume, onNavigate }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2400);
  };

  return (
    <section id="home" className="hero-section">
      {/* 3D WebGL Background Wireframe & Orbit Scene (Lazy loaded) */}
      <Suspense fallback={<div className="hero-scene-fallback" aria-hidden="true" />}>
        <HeroScene3D />
      </Suspense>

      <div className="container hero-container">
        {/* Top Status Bar (Devix inspired) */}
        <div className="hero-status-row">
          <div className="status-badge-available">
            <span className="status-pulse-dot" />
            <span className="status-text">AVAILABLE FOR INTERNSHIPS &amp; ROLES</span>
          </div>
          <span className="hero-status-meta">B.TECH CS • 2022–2026</span>
        </div>

        <div className="hero-main-layout">
          {/* Main Headline & Intro */}
          <div className="hero-left-col">
            <motion.div
              className="hero-headline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-display-title">
                BUILDING FULL-STACK
                <span className="hero-accent-break">
                  <span className="hero-title-accent">EXPERIENCES</span>
                  <span className="hero-dot">.</span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              className="hero-role-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-role-prefix">I am Dipanshu Jaiswal —</span>
              <span className="hero-role-typing">
                <Typewriter roles={personalInfo.roles} />
              </span>
            </motion.div>

            <motion.p
              className="hero-summary-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={personalInfo.resumePath}
                download
                onClick={handleDownload}
                className="btn btn-primary"
                aria-label="Download Dipanshu's Resume (PDF)"
              >
                {downloadSuccess ? (
                  <>
                    <CheckIcon size={18} />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon size={18} />
                    <span>Download CV</span>
                  </>
                )}
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-outline"
                aria-label="View Resume Preview"
              >
                <EyeIcon size={18} />
                <span>View CV</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="btn btn-ghost"
                aria-label="Explore Selected Projects"
              >
                <span>Projects</span>
                <ArrowRightIcon size={16} />
              </button>
            </motion.div>

            {/* Social links row */}
            <motion.div
              className="hero-social-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <span className="social-label">CONNECT:</span>
              <div className="social-btn-group">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-pill"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={17} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-pill"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={17} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hero-social-pill"
                  aria-label="Send Direct Email"
                >
                  <MailIcon size={17} />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Masked Profile Frame & Stat Counters (Xfolio style) */}
          <div className="hero-right-col">
            <motion.div
              className="profile-frame-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="profile-corner-bracket corner-tl" />
              <div className="profile-corner-bracket corner-br" />

              <div className="profile-image-mask">
                {!imgError ? (
                  <img
                    src="/images/profilePhoto.jpeg"
                    alt="Dipanshu Jaiswal"
                    className="profile-img"
                    width="340"
                    height="420"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="profile-placeholder-box"
                    title="Add your photo to /public/images/profile.jpg"
                  >
                    <span className="profile-monogram-initials">DJ</span>
                    <span className="profile-placeholder-name">Dipanshu Jaiswal</span>
                    <span className="profile-placeholder-sub">B.Tech CS Student</span>
                  </div>
                )}
              </div>

              <div className="profile-meta-tag">
                <span className="meta-tag-label">SPECIALIZATION</span>
                <span className="meta-tag-value">Full-Stack MERN</span>
              </div>
            </motion.div>

            {/* Stat Counters Banner (Xfolio inspired) */}
            <motion.div
              className="hero-stats-band"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="hero-stat-block">
                <span className="stat-number">04<span className="stat-accent">+</span></span>
                <span className="stat-caption">Projects Built</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-block">
                <span className="stat-number">06</span>
                <span className="stat-caption">Certifications</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-block">
                <span className="stat-number">14<span className="stat-accent">W</span></span>
                <span className="stat-caption">IBM Internship</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
