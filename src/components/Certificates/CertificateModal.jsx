import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AwardIcon,
  CheckIcon
} from '../Common/Icons';
import { getLenis } from '../../hooks/useLenis';

export const CertificateModal = ({
  certificate,
  allCertificates,
  onClose,
  onSelectCertificate,
  triggerElement
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    setIframeError(false);
  }, [certificate]);

  const currentIndex = allCertificates.findIndex((c) => c.id === certificate?.id);
  const total = allCertificates.length;

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    onSelectCertificate(allCertificates[prevIdx]);
  }, [currentIndex, total, allCertificates, onSelectCertificate]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    onSelectCertificate(allCertificates[nextIdx]);
  }, [currentIndex, total, allCertificates, onSelectCertificate]);

  useEffect(() => {
    if (!certificate) return;

    // Save previously focused element to restore on close
    previouslyFocusedElement.current = triggerElement || document.activeElement;

    // Stop Lenis smooth scroll and lock body
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    // Focus first interactive element inside modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Focus trap for Tab / Shift+Tab
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (lenis) lenis.start();

      // Return focus to trigger element on close
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [certificate, onClose, handlePrev, handleNext, triggerElement]);

  const handleCopyPdfUrl = () => {
    if (certificate?.pdfUrl) {
      const fullUrl = window.location.origin + certificate.pdfUrl;
      navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!certificate) return null;

  const titleId = `certificate-modal-title-${certificate.id}`;

  return (
    <AnimatePresence>
      <div
        className="modal-backdrop-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <motion.div
          ref={modalRef}
          className="certificate-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
            scale: 0.9,
            clipPath: 'inset(8% 8% 8% 8% round 16px)'
          }}
          animate={{
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 12px)'
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            clipPath: 'inset(8% 8% 8% 8% round 16px)'
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="cert-header-info">
              <span className="cert-issuer-badge">{certificate.issuer}</span>
              <h3 id={titleId} className="modal-title">{certificate.title}</h3>
              <p className="modal-subtitle">{certificate.date}</p>
            </div>

            <div className="modal-header-actions">
              <a
                href={certificate.pdfUrl}
                download
                className="btn btn-sm primary cert-action-btn"
                aria-label={`Download ${certificate.title} PDF`}
                title="Download original certificate PDF"
              >
                <DownloadIcon size={16} />
                <span>Download</span>
              </a>

              <a
                href={certificate.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm secondary cert-action-btn"
                aria-label={`Open ${certificate.title} in new tab`}
                title="Open PDF in new tab"
              >
                <ExternalLinkIcon size={16} />
                <span>Open Tab</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="modal-close-btn"
                aria-label="Close Certificate Preview (Esc)"
                title="Close (Esc)"
              >
                <CloseIcon size={20} />
              </button>
            </div>
          </div>

          {/* Modal Main: PDF viewer + Info Sidebar */}
          <div className="certificate-modal-layout">
            {/* PDF View Area with Prev/Next navigation */}
            <div className="certificate-viewer-frame">
              <button
                type="button"
                className="cert-nav-arrow arrow-prev"
                onClick={handlePrev}
                aria-label="Previous Certificate (Left Arrow)"
                title="Previous Certificate (Left Arrow)"
              >
                <ChevronLeftIcon size={22} />
              </button>

              {/* Desktop PDF Iframe Preview */}
              <div className="certificate-embed-wrapper">
                {!iframeError ? (
                  <iframe
                    src={`${certificate.pdfUrl}#toolbar=0&navpanes=0`}
                    title={`${certificate.title} Preview`}
                    className="certificate-iframe"
                    onError={() => setIframeError(true)}
                  />
                ) : (
                  <div className="certificate-fallback-box">
                    <AwardIcon size={44} className="fallback-icon" />
                    <h4>Certificate Verified</h4>
                    <p>In-browser PDF rendering is limited on this browser viewport.</p>
                    <div className="fallback-actions">
                      <a href={certificate.pdfUrl} download className="btn primary">
                        <DownloadIcon size={16} />
                        <span>Download PDF</span>
                      </a>
                      <a href={certificate.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn secondary">
                        <ExternalLinkIcon size={16} />
                        <span>View in New Tab</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Mobile direct fallback banner */}
                <div className="cert-mobile-action-bar">
                  <div className="cert-mobile-info">
                    <AwardIcon size={18} />
                    <span>Official verified credential</span>
                  </div>
                  <div className="cert-mobile-buttons">
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm secondary"
                    >
                      <ExternalLinkIcon size={14} />
                      <span>Open PDF</span>
                    </a>
                    <a
                      href={certificate.pdfUrl}
                      download
                      className="btn btn-sm primary"
                    >
                      <DownloadIcon size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="cert-nav-arrow arrow-next"
                onClick={handleNext}
                aria-label="Next Certificate (Right Arrow)"
                title="Next Certificate (Right Arrow)"
              >
                <ChevronRightIcon size={22} />
              </button>
            </div>

            {/* Sidebar Meta Details */}
            <div className="certificate-meta-sidebar">
              <div className="cert-meta-header">
                <span className="cert-counter-indicator">
                  Certificate {currentIndex + 1} of {total}
                </span>
                <span className="cert-badge-category">{certificate.category}</span>
              </div>

              <div className="cert-sidebar-block">
                <h4>Credential Details</h4>
                <p className="cert-meta-desc">{certificate.description}</p>
              </div>

              {certificate.skillsLearned && certificate.skillsLearned.length > 0 && (
                <div className="cert-sidebar-block">
                  <h5>Competencies Verified</h5>
                  <div className="cert-skill-tags">
                    {certificate.skillsLearned.map((skill, sIdx) => (
                      <span key={sIdx} className="tech-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="cert-sidebar-block">
                <h5>Issuer Organization</h5>
                <p className="cert-issuer-full">{certificate.issuer}</p>
                <p className="cert-date-full">Completed: {certificate.date}</p>
              </div>

              <div className="cert-sidebar-footer">
                <button
                  type="button"
                  onClick={handleCopyPdfUrl}
                  className="cert-copy-link-btn"
                  aria-label="Copy direct link to certificate file"
                >
                  {copiedLink ? <CheckIcon size={15} /> : <ExternalLinkIcon size={15} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy File Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
