import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '../Common/TiltCard';
import { CertificateModal } from './CertificateModal';
import { certificatesData, certificateCategories } from '../../data/certificates';
import { AwardIcon, DownloadIcon, EyeIcon } from '../Common/Icons';

export const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
  const [triggerElement, setTriggerElement] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const cardRefs = useRef({});

  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'All') return certificatesData;
    return certificatesData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Refresh ScrollTrigger when category filter changes to prevent height jumps
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleOpenCert = (cert, el) => {
    setTriggerElement(el);
    setSelectedCert(cert);
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="container">
        {/* Pre-header tag */}
        <div className="section-pre-header">
          <span className="section-tag-num">05</span>
          <span className="section-tag-text">VERIFIED CREDENTIALS</span>
        </div>

        {/* Section Header */}
        <div className="certs-header-row">
          <div>
            <h2 className="certificates-section-title">
              PROFESSIONAL <span className="title-accent">CERTIFICATIONS</span>.
            </h2>
            <p className="certificates-header-desc">
              Industry-certified specializations in enterprise cloud computing, algorithms, and engineering communications from IBM SkillsBuild, NPTEL, and IITs.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="cert-filter-wrapper">
            <div className="filter-tabs-container" role="tablist" aria-label="Certificate Categories">
              {certificateCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCertFilter"
                        className="filter-active-indicator"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid-wrapper">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, idx) => {
              const hasImgError = imgErrors[cert.id];
              const certNumber = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={cert.id}
                  ref={(el) => (cardRefs.current[cert.id] = el)}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="cert-grid-col"
                >
                  <TiltCard maxTilt={6} scale={1.01} className="cert-card-tilt">
                    <div className="certificate-card-inner">
                      {/* Top Header Badge Row */}
                      <div className="cert-card-topbar">
                        <span className="cert-serial-num">{certNumber}</span>
                        <span className="cert-category-badge">{cert.category}</span>
                      </div>

                      {/* Thumbnail or Styled Vector Fallback */}
                      <div
                        className="certificate-thumbnail-frame"
                        onClick={() => handleOpenCert(cert, cardRefs.current[cert.id])}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenCert(cert, cardRefs.current[cert.id]);
                          }
                        }}
                        aria-label={`Open ${cert.title} preview`}
                      >
                        {!hasImgError && cert.thumbnail ? (
                          <img
                            src={cert.thumbnail}
                            alt={`${cert.title} preview`}
                            className="cert-thumb-img"
                            onError={() => handleImageError(cert.id)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="cert-thumbnail-fallback">
                            <div className="cert-fallback-emblem">
                              <AwardIcon size={36} />
                            </div>
                            <span className="fallback-issuer">{cert.issuer}</span>
                            <span className="fallback-title">{cert.title}</span>
                            <div className="fallback-watermark" aria-hidden="true">
                              <span>VERIFIED</span>
                            </div>
                          </div>
                        )}
                        <div className="cert-thumb-hover-hint">
                          <EyeIcon size={18} />
                          <span>Click to Inspect</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="certificate-card-body">
                        <div className="cert-date-row">
                          <span className="cert-date-pill">{cert.date}</span>
                        </div>
                        <h3
                          className="cert-card-title"
                          onClick={() => handleOpenCert(cert, cardRefs.current[cert.id])}
                        >
                          {cert.title}
                        </h3>
                        <p className="cert-card-issuer">{cert.issuer}</p>
                        <p className="cert-card-desc">
                          {cert.description.length > 120
                            ? `${cert.description.substring(0, 120)}...`
                            : cert.description}
                        </p>

                        {/* Verified skills tags */}
                        {cert.skillsLearned && (
                          <div className="cert-tags-row">
                            {cert.skillsLearned.slice(0, 3).map((skill, sIdx) => (
                              <span key={sIdx} className="tech-chip">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Actions: View & Direct Download */}
                        <div className="cert-card-actions">
                          <button
                            type="button"
                            onClick={() => handleOpenCert(cert, cardRefs.current[cert.id])}
                            className="cert-btn-view"
                            aria-label={`View ${cert.title} certificate`}
                          >
                            <EyeIcon size={15} />
                            <span>Preview</span>
                          </button>

                          <a
                            href={cert.pdfUrl}
                            download
                            className="cert-btn-download"
                            aria-label={`Direct download ${cert.title} PDF`}
                            title="Direct download PDF"
                          >
                            <DownloadIcon size={15} />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          allCertificates={filteredCertificates}
          triggerElement={triggerElement}
          onClose={() => setSelectedCert(null)}
          onSelectCertificate={setSelectedCert}
        />
      )}
    </section>
  );
};
