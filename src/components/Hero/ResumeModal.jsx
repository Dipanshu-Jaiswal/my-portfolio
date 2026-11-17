import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, DownloadIcon, ExternalLinkIcon } from '../Common/Icons';

export const ResumeModal = ({ isOpen, onClose, resumeUrl = '/resume/Dipanshu_Resume.pdf' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Resume Preview">
        <motion.div
          className="resume-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="modal-header">
            <div>
              <h3 className="modal-title">Dipanshu Jaiswal — Resume</h3>
              <p className="modal-subtitle">B.Tech Computer Science Student</p>
            </div>
            <div className="modal-header-actions">
              <a
                href={resumeUrl}
                download="Dipanshu_Resume.pdf"
                className="btn btn-sm primary"
              >
                <DownloadIcon size={16} />
                <span>Download</span>
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm secondary"
              >
                <ExternalLinkIcon size={16} />
                <span>Open in Tab</span>
              </a>
              <button
                onClick={onClose}
                className="modal-close-btn"
                aria-label="Close Resume Preview"
              >
                <CloseIcon size={20} />
              </button>
            </div>
          </div>

          <div className="resume-modal-body">
            <iframe
              src={`${resumeUrl}#toolbar=0`}
              title="Dipanshu Jaiswal Resume"
              className="pdf-iframe"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

