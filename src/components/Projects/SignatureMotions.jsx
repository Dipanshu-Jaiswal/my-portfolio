import React from 'react';
import { motion } from 'framer-motion';

// 1. StudyNotion: Course Progress Filling & Lecture Tracker (Lime Accent)
export const StudyNotionMotion = () => {
  return (
    <div className="signature-motion-box studynotion-preview">
      <div className="motion-header">
        <span className="motion-tag">LMS PROGRESS TRACKER</span>
        <span className="live-status-pill">ACTIVE MODULE</span>
      </div>

      <div className="lms-content-mock">
        <div className="lms-lesson-title">Full-Stack MERN Architecture • Lecture 14</div>
        <div className="lms-progress-bar-bg">
          <motion.div
            className="lms-progress-bar-fill"
            initial={{ width: '20%' }}
            animate={{ width: ['20%', '85%', '100%', '85%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="lms-stats-row">
          <span>Module Completion</span>
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="lms-percent"
          >
            85% Complete
          </motion.span>
        </div>
      </div>
    </div>
  );
};

// 2. Sadak-Saathi: Pulsing Map Pin & Animated Route Line
export const SadakSaathiMotion = () => {
  return (
    <div className="signature-motion-box sadak-preview">
      <div className="motion-header">
        <span className="motion-tag">GPS ROAD COMPANION</span>
        <span className="route-status-pill">ROUTE ACTIVE</span>
      </div>

      <div className="map-canvas-mock">
        <svg className="map-route-svg" viewBox="0 0 260 85">
          {/* Base track */}
          <path
            d="M 20 65 Q 85 10, 145 45 T 240 20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Active Navigation Line in Electric Lime */}
          <motion.path
            d="M 20 65 Q 85 10, 145 45 T 240 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -36] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Start Point */}
          <circle cx="20" cy="65" r="4.5" fill="#FFFFFF" />
          {/* Destination Pin */}
          <circle cx="240" cy="20" r="6" fill="var(--accent)" />
          <motion.circle
            cx="240"
            cy="20"
            r="12"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.8], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </svg>

        <div className="map-info-strip">
          <span>📍 Emergency & Mechanic Locator</span>
          <span className="traffic-indicator">Clear Path</span>
        </div>
      </div>
    </div>
  );
};

// 3. Email Classifier: Flipping Envelope spam / ham detector
export const EmailClassifierMotion = () => {
  return (
    <div className="signature-motion-box classifier-preview">
      <div className="motion-header">
        <span className="motion-tag">ML INFERENCE ENGINE</span>
        <span className="ml-status-pill">98% ACCURACY</span>
      </div>

      <div className="envelope-flip-area">
        <motion.div
          className="flip-envelope-card"
          animate={{
            rotateY: [0, 180, 180, 360, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: 'easeInOut'
          }}
        >
          {/* Front: Verified Inbox */}
          <div className="envelope-face envelope-front">
            <span className="envelope-icon">✉️</span>
            <span className="verdict-label safe-verdict">NOT SPAM (INBOX)</span>
            <span className="verdict-detail">Legitimate Email Verified</span>
          </div>

          {/* Back: Spam Filtered */}
          <div className="envelope-face envelope-back">
            <span className="envelope-icon">⚠️</span>
            <span className="verdict-label spam-verdict">SPAM DETECTED</span>
            <span className="verdict-detail">Filtered to Quarantine</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// 4. IoT RADAR System: 180° Rotating Radar Sweep with Object Blips
export const IoTRadarMotion = () => {
  return (
    <div className="signature-motion-box radar-preview">
      <div className="motion-header">
        <span className="motion-tag">ARDUINO 180° ULTRASONIC SWEEP</span>
        <span className="radar-status-pill">95% PRECISION</span>
      </div>

      <div className="radar-screen">
        <div className="radar-ring radar-ring-3" />
        <div className="radar-ring radar-ring-2" />
        <div className="radar-ring radar-ring-1" />
        <div className="radar-crosshair-h" />
        <div className="radar-crosshair-v" />

        {/* Sweep beam */}
        <div className="radar-sweep-beam" />

        {/* Target blips in Electric Lime */}
        <div className="radar-blip radar-blip-1" />
        <div className="radar-blip radar-blip-2" />

        <div className="radar-telemetry">
          <span>Angle: 114°</span>
          <span>Distance: 1.24m</span>
        </div>
      </div>
    </div>
  );
};

export const ProjectSignaturePreview = ({ signatureType }) => {
  switch (signatureType) {
    case 'studyNotion':
      return <StudyNotionMotion />;
    case 'sadakSaathi':
      return <SadakSaathiMotion />;
    case 'emailClassifier':
      return <EmailClassifierMotion />;
    case 'iotRadar':
      return <IoTRadarMotion />;
    default:
      return null;
  }
};
