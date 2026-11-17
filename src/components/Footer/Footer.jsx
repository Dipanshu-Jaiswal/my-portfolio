import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from '../Common/Icons';
import { personalInfo } from '../../data/skills';
import { getLenis } from '../../hooks/useLenis';

export const Footer = () => {
  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Giant Outlined Typography (Devix / Xfolio signature element) */}
        <div className="footer-giant-brand-wrap" aria-hidden="true">
          <h2 className="footer-giant-text">
            <span>DIPANSHU</span> <span>JAISWAL</span>
          </h2>
        </div>

        {/* Action Row */}
        <div className="footer-action-row">
          <div className="footer-tagline">
            <span className="footer-dot-indicator" />
            <p className="footer-sub">
              B.Tech Computer Science (2022–2026) • Shri Vaishnav Vidyapeeth Vishwavidyalaya
            </p>
          </div>

          {/* Social Links (Strictly GitHub, LinkedIn, Email only) */}
          <div className="footer-social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-social-pill"
              aria-label="Send Email to Dipanshu"
            >
              <MailIcon size={16} />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top magnetic pill */}
          <motion.button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Scroll back to top of the page"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>BACK TO TOP</span>
            <div className="top-arrow-circle">
              <ArrowUpIcon size={16} />
            </div>
          </motion.button>
        </div>

        <div className="footer-divider-line" />

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Dipanshu Jaiswal. Engineered with React, Three.js & Lenis.
          </p>
          <p className="footer-location">
            Ujjain / Indore, Madhya Pradesh • Open for Software Opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};
