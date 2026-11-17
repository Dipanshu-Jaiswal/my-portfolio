import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/skills';

export const Timeline = () => {
  // Professional experience and verified internships
  const internshipItems = [
    {
      title: "Trainee Software Engineer (React Frontend Developer)",
      organization: "CODES FOR TOMORROW",
      period: "",
      badge: "Currently Working"
    },
    {
      title: "Frontend Developer Intern",
      organization: "CODES FOR TOMORROW",
      period: "Joined 17 July 2026",
      badge: "Internship"
    },
    {
      title: "IBM Virtual Internship — Cloud Technologies",
      organization: "IBM SkillsBuild & Allsoft Solutions",
      period: "Jan 2026 – May 2026",
      badge: "14 Weeks",
      description: "Industry-oriented program focused on enterprise cloud architecture, microservices, containerization, and modern deployment pipelines."
    },
    {
      title: "IBM Cloud Computing Virtual Internship",
      organization: "IBM SkillsBuild",
      period: "Feb 2026 – Mar 2026",
      badge: "Cloud Computing",
      description: "Hands-on exposure to cloud infrastructure, resource provisioning, security compliance, and virtualization practices."
    },
    {
      title: "Java with DSA Specialization",
      organization: "Apna College",
      period: "Jun 2025 – Present",
      badge: "Core Engineering",
      description: "Advanced problem solving, algorithmic complexity optimization, memory management, and data structures."
    }
  ];

  return (
    <div className="dual-timeline-wrapper">
      <div className="dual-timeline-grid">
        {/* Left Column: Education */}
        <div className="timeline-column">
          <div className="timeline-column-header">
            <span className="column-num-badge">01</span>
            <h3 className="column-title">EDUCATION</h3>
          </div>

          <div className="timeline-items-list">
            {personalInfo.education.map((item, idx) => (
              <motion.div
                key={idx}
                className="timeline-item-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="item-card-header">
                  <span className="item-period">{item.period}</span>
                  <span className="item-grade-pill">{item.score}</span>
                </div>
                <h4 className="item-title">{item.degree}</h4>
                <p className="item-org">{item.institution}</p>
                <p className="item-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Animated Divider Line (Desktop) */}
        <div className="timeline-center-divider" aria-hidden="true">
          <div className="divider-line" />
        </div>

        {/* Right Column: Internships & Learning */}
        <div className="timeline-column">
          <div className="timeline-column-header">
            <span className="column-num-badge">02</span>
            <h3 className="column-title">INTERNSHIPS & LEARNING</h3>
          </div>

          <div className="timeline-items-list">
            {internshipItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="timeline-item-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="item-card-header">
                  <span className="item-period">{item.period}</span>
                  <span className="item-grade-pill">{item.badge}</span>
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-org">{item.organization}</p>
                {item.description && <p className="item-desc">{item.description}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
