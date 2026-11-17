import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from '../Common/TiltCard';
import { skillCategories } from '../../data/skills';
import { CodeIcon, GlobeIcon, DatabaseIcon, ZapIcon } from '../Common/Icons';

export const Skills = () => {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'code':
        return <CodeIcon size={24} />;
      case 'globe':
        return <GlobeIcon size={24} />;
      case 'database':
        return <DatabaseIcon size={24} />;
      case 'zap':
      default:
        return <ZapIcon size={24} />;
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-pre-header">
          <span className="section-tag-num">03</span>
          <span className="section-tag-text">TECHNICAL ARSENAL</span>
        </div>

        <div className="skills-header-row">
          <h2 className="skills-section-title">
            CORE SKILLS & <span className="title-accent">STACK</span>.
          </h2>
          <p className="skills-header-desc">
            A battle-tested technical toolkit focused on modern full-stack web applications, database architecture, and computer science foundations.
          </p>
        </div>

        {/* 4 Numbered Skills Cards */}
        <div className="skills-categories-grid">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <TiltCard maxTilt={8} scale={1.01} className="skill-card-tilt">
                <div className="skill-category-card">
                  <div className="skill-category-top">
                    <span className="category-num">0{idx + 1}</span>
                    <span className="category-competencies-count">{cat.skills.length} Skills</span>
                  </div>

                  <div className="skill-category-header">
                    <div className="skill-category-icon-wrapper">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="skill-category-name">{cat.title}</h3>
                    </div>
                  </div>

                  <div className="skill-chips-wrap">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="skill-pill-item">
                        <span className="skill-name">{skill.name}</span>
                        {skill.level && (
                          <span className="skill-level-badge">{skill.level}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
