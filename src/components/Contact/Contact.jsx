import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ExternalLinkIcon
} from '../Common/Icons';
import { personalInfo } from '../../data/skills';

const SERVICE_OPTIONS = [
  'Full-Stack Web Application',
  'Frontend & React Development',
  'REST API & Backend Architecture',
  'Software Internship / Role',
  'General Collaboration'
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: SERVICE_OPTIONS[0],
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Rate limit countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Magnetic CTA button state
  const magneticBtnRef = useRef(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e) => {
    if (!magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    setMagneticPos({ x: deltaX, y: deltaY });
  };

  const handleMagneticLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please share a brief message about your project or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot check: if filled, silently stop
    if (honeypot.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 500);
      return;
    }

    // Rate limit check
    if (cooldown > 0) {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const formspreeEndpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT;
    const isProduction = process.env.NODE_ENV === 'production';

    // In production: if endpoint is missing, do NOT fake success
    if (isProduction && !formspreeEndpoint) {
      setIsSubmitting(false);
      setErrors({
        form: 'Message could not be sent, please email me directly:',
        directEmail: personalInfo.email
      });
      return;
    }

    try {
      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            serviceType: formData.serviceType,
            message: formData.message,
            _gotcha: honeypot
          })
        });

        if (!response.ok) {
          throw new Error('Form submission failed with status ' + response.status);
        }
      } else {
        // Development-only simulated demo mode
        await new Promise((res) => setTimeout(res, 850));
      }

      setSubmitted(true);
      setCooldown(10); // 10-second rate limit cooldown
      setFormData({
        name: '',
        email: '',
        serviceType: SERVICE_OPTIONS[0],
        message: ''
      });
    } catch (err) {
      // Network failure error state
      setErrors({
        form: 'Network error: Failed to reach form service. Please verify your connection or email me directly:',
        directEmail: personalInfo.email
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDevMode = process.env.NODE_ENV !== 'production' && !process.env.REACT_APP_FORMSPREE_ENDPOINT;

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Pre-tag */}
        <div className="section-pre-header">
          <span className="section-tag-num">06</span>
          <span className="section-tag-text">GET IN TOUCH</span>
        </div>

        {/* Big "Let's work together" Hero Banner */}
        <div className="contact-hero-banner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-huge-headline">
              LET'S BUILD <span className="title-accent">SOMETHING</span> EXTRAORDINARY.
            </h2>
            <p className="contact-hero-subtitle">
              Have an open software role, internship opportunity, or technical challenge? I'm available for engineering positions and ambitious collaborations.
            </p>
          </motion.div>
        </div>

        {/* Contact Layout Grid: Left info & socials, Right Interactive Form */}
        <div className="contact-main-grid">
          {/* Left Column: Direct channels & Quick Connect */}
          <motion.div
            className="contact-info-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-channels-card">
              <span className="channels-card-tag">DIRECT INBOX</span>
              <h3 className="channels-card-title">Drop me a line anytime</h3>
              <p className="channels-card-desc">
                Email is the fastest way to get in touch. Click to copy directly or send an email through your preferred client.
              </p>

              {/* Copy Email Box */}
              <div className="email-copy-box">
                <div className="email-copy-left">
                  <div className="email-icon-frame">
                    <MailIcon size={20} />
                  </div>
                  <div className="email-copy-text">
                    <span className="email-label">EMAIL ADDRESS</span>
                    <a href={`mailto:${personalInfo.email}`} className="email-value">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`copy-email-btn ${emailCopied ? 'copied' : ''}`}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {emailCopied ? (
                    <>
                      <CheckIcon size={16} />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={16} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status pill */}
              <div className="contact-availability-card">
                <span className="status-indicator-dot live" />
                <div>
                  <span className="status-avail-title">Ready for Work &amp; Internships</span>
                  <span className="status-avail-sub">Response time: within 24 hours</span>
                </div>
              </div>

              {/* Social Channels (Strictly LinkedIn, GitHub, Email only) */}
              <div className="contact-social-bar">
                <span className="social-bar-label">SOCIAL PROFILES</span>
                <div className="social-links-row">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={18} />
                    <span>GitHub</span>
                    <ExternalLinkIcon size={13} />
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={18} />
                    <span>LinkedIn</span>
                    <ExternalLinkIcon size={13} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="contact-form-card">
              <div className="form-card-header">
                <div className="form-header-badge-row">
                  <h3 className="form-title">Send a Direct Message</h3>
                  {isDevMode && (
                    <span className="demo-mode-pill" title="Set REACT_APP_FORMSPREE_ENDPOINT in .env for production">
                      Demo Mode
                    </span>
                  )}
                </div>
                <p className="form-subtitle">Fill in the details below and I'll respond as soon as possible.</p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="form-success-banner"
                  >
                    <div className="success-icon-wrap">
                      <CheckIcon size={32} />
                    </div>
                    <h4>Message Dispatched!</h4>
                    <p>
                      Thank you for reaching out. Your message has been received, and I will get back to you shortly at your email address.
                    </p>
                    {isDevMode && (
                      <p className="dev-mode-note">
                        <em>(Demo mode active: Configure REACT_APP_FORMSPREE_ENDPOINT in .env for live email delivery)</em>
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn btn-sm secondary"
                      disabled={cooldown > 0}
                    >
                      {cooldown > 0 ? `Wait ${cooldown}s` : 'Send Another Message'}
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} noValidate className="contact-form-inner">
                    {/* Error Banner with clickable email */}
                    {errors.form && (
                      <div className="form-global-error" role="alert">
                        <p>{errors.form}</p>
                        {errors.directEmail && (
                          <a href={`mailto:${errors.directEmail}`} className="error-email-link">
                            {errors.directEmail}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Hidden Honeypot Field (_gotcha) for Spam Bots */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="contact-gotcha">Do not fill this field</label>
                      <input
                        type="text"
                        id="contact-gotcha"
                        name="_gotcha"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name & Email Row */}
                    <div className="form-fields-row">
                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">
                          Your Name <span className="label-req">*</span>
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dipanshu Jaiswal"
                          className={`form-input ${errors.name ? 'input-error' : ''}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-err' : undefined}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <span id="name-err" className="form-err-msg">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">
                          Your Email <span className="label-req">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. dipanshu@example.com"
                          className={`form-input ${errors.email ? 'input-error' : ''}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-err' : undefined}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <span id="email-err" className="form-err-msg">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Service Type Selection */}
                    <div className="form-group">
                      <label htmlFor="contact-service" className="form-label">
                        Inquiry / Service Category
                      </label>
                      <select
                        id="contact-service"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="form-select"
                        disabled={isSubmitting}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        Your Message <span className="label-req">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the role, project goals, timeline, or tech stack..."
                        className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'msg-err' : undefined}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <span id="msg-err" className="form-err-msg">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Magnetic CTA Button */}
                    <div className="form-action-area">
                      <motion.button
                        ref={magneticBtnRef}
                        type="submit"
                        disabled={isSubmitting || cooldown > 0}
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticLeave}
                        animate={{ x: magneticPos.x, y: magneticPos.y }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                        className="btn-magnetic-submit"
                        aria-label="Send Message"
                      >
                        <span>
                          {isSubmitting
                            ? 'SENDING...'
                            : cooldown > 0
                            ? `PLEASE WAIT (${cooldown}s)`
                            : 'SEND MESSAGE'}
                        </span>
                        <ArrowRightIcon size={18} />
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
