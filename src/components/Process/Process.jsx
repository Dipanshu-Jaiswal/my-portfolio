import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    num: "01",
    tag: "PLAN",
    title: "Requirements & System Architecture",
    description: "Analyzing system requirements, designing database schemas (SQL/MongoDB), structuring RESTful API endpoints, and mapping component hierarchies for scalable engineering.",
    deliverables: ["Entity-Relationship Models", "API Route Specifications", "Component Wireframes"]
  },
  {
    num: "02",
    tag: "CODE",
    title: "Full-Stack Development & UI Motion",
    description: "Crafting clean, modular code with React.js, Node.js, Express, and Java. Implementing state management, responsive layouts, and silky smooth micro-interactions.",
    deliverables: ["Modular React Components", "Secure REST APIs (JWT)", "Database CRUD Operations"]
  },
  {
    num: "03",
    tag: "TEST",
    title: "Verification, Performance & QA",
    description: "Rigorous testing of API endpoints with Postman, unit test verification, cross-device responsiveness checks (320px to 4K), and edge-case handling.",
    deliverables: ["Automated Unit Tests", "Responsive QA Checks", "Accessibility & Performance Audits"]
  },
  {
    num: "04",
    tag: "DEPLOY",
    title: "Optimized Production & Deployment",
    description: "Building production-optimized bundles, configuring environment variables, setting up cloud hosting on Vercel/Netlify/Render, and performance monitoring.",
    deliverables: ["Production Build Optimization", "CI/CD Deployment", "Live Domain & HTTPS Config"]
  }
];

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-pre-header">
          <span className="section-tag-num">02</span>
          <span className="section-tag-text">ENGINEERING PROCESS</span>
        </div>

        <div className="process-header-row">
          <h2 className="process-section-title">
            HOW I BUILD <span className="title-accent">SOFTWARE</span>.
          </h2>
          <p className="process-header-desc">
            A structured, disciplined engineering workflow inspired by modern industry standards, from concept to production deployment.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="process-cards-grid">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.num}
                className={`process-card ${isActive ? 'card-active' : ''}`}
                onMouseEnter={() => setActiveStep(idx)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="process-card-top">
                  <span className="process-step-num">{step.num}</span>
                  <span className="process-step-tag">{step.tag}</span>
                </div>

                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>

                <div className="process-deliverables-list">
                  <span className="deliverables-heading">DELIVERABLES:</span>
                  <ul>
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx}>
                        <span className="deliverable-bullet">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

