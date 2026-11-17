import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from './Timeline';
import { personalInfo } from '../../data/skills';
import { MapPinIcon, GlobeIcon, SparklesIcon, CodeIcon } from '../Common/Icons';

export const About = () => {
  const statementWords = [
    "I", "am", "a", "Full-Stack", "Developer", "and", "Computer", "Science", "student", "at",
    "Shri", "Vaishnav", "Vidyapeeth", "Vishwavidyalaya.", "I", "specialize", "in", "building",
    "scalable", "MERN", "applications,", "clean", "APIs,", "and", "robust", "system", "architectures."
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-pre-header">
          <span className="section-tag-num">01</span>
          <span className="section-tag-text">ABOUT ME</span>
        </div>

        <div className="about-hero-block">
          {/* Word-by-word statement reveal */}
          <h2 className="about-highlight-statement">
            {statementWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <motion.span
                  className={`statement-word ${['Full-Stack', 'Developer', 'MERN', 'scalable', 'robust'].includes(word) ? 'word-accent' : ''}`}
                  initial={{ opacity: 0.15, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                >
                  {word}
                </motion.span>
                {' '}
              </React.Fragment>
            ))}
          </h2>

          <motion.p
            className="about-secondary-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            With a solid foundation in Data Structures, Algorithms, and Modern Web Technologies, I build responsive, production-ready applications with strong attention to performance, UI motion, and code maintainability.
          </motion.p>
        </div>

        {/* Quick Attribute Pills */}
        <div className="about-attributes-grid">
          <div className="attribute-card">
            <div className="attribute-icon"><MapPinIcon size={18} /></div>
            <div>
              <span className="attr-label">LOCATION</span>
              <span className="attr-value">{personalInfo.location}</span>
            </div>
          </div>

          <div className="attribute-card">
            <div className="attribute-icon"><GlobeIcon size={18} /></div>
            <div>
              <span className="attr-label">LANGUAGES</span>
              <span className="attr-value">English, Hindi</span>
            </div>
          </div>

          <div className="attribute-card">
            <div className="attribute-icon"><CodeIcon size={18} /></div>
            <div>
              <span className="attr-label">CORE STACK</span>
              <span className="attr-value">React, Node.js, Java, SQL</span>
            </div>
          </div>

          <div className="attribute-card">
            <div className="attribute-icon"><SparklesIcon size={18} /></div>
            <div>
              <span className="attr-label">STRENGTHS</span>
              <span className="attr-value">Problem Solving, Quick Learner</span>
            </div>
          </div>
        </div>

        {/* Two-Column Education & Experience Timeline (Xfolio inspired) */}
        <Timeline />
      </div>
    </section>
  );
};
