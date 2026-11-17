import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../Theme/ThemeToggle';
import { MenuIcon, CloseIcon, ArrowRightIcon } from '../Common/Icons';

export const Navbar = ({ sections, activeSection, onNavigate, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background blur after 30px
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (with a 60px tolerance buffer)
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current && !mobileMenuOpen) {
          setIsHidden(true); // scrolling down
        } else {
          setIsHidden(false); // scrolling up
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'navbar-hidden' : ''}`}
      >
        <nav className="nav-container" aria-label="Main Navigation">
          {/* Brand Logo with Electric Lime Accent */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="brand-logo"
            aria-label="Dipanshu Jaiswal"
          >
            <span className="logo-badge">DJ</span>
            <span className="logo-text">
              DIPANSHU<span className="logo-accent">.</span>
            </span>
          </a>

          {/* Desktop Nav Menu */}
          <ul className="desktop-nav-menu" role="menubar">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id} role="none" className="nav-item-wrapper">
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="nav-item-name">{section.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Nav Actions: Theme Toggle + Mobile Trigger */}
          <div className="nav-actions">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Fullscreen Menu"
              aria-expanded={mobileMenuOpen}
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fullscreen-mobile-menu"
            initial={{ opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen Navigation"
          >
            <div className="fullscreen-menu-header">
              <div className="brand-logo">
                <span className="logo-badge">DJ</span>
                <span className="logo-text">DIPANSHU<span className="logo-accent">.</span></span>
              </div>
              <button
                className="fullscreen-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            <div className="fullscreen-menu-body">
              <ul className="fullscreen-nav-list">
                {sections.map((section, idx) => {
                  const isActive = activeSection === section.id;
                  return (
                    <motion.li
                      key={section.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * idx, duration: 0.4 }}
                    >
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleNavClick(e, section.id)}
                        className={`fullscreen-nav-link ${isActive ? 'active' : ''}`}
                      >
                        <span className="fullscreen-nav-name">{section.name}</span>
                        <ArrowRightIcon size={22} className="fullscreen-link-arrow" />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="fullscreen-menu-footer">
              <div className="fullscreen-contact-meta">
                <span className="meta-label">DIRECT EMAIL</span>
                <a href="mailto:djaiseal0807@gmail.com" className="meta-value">djaiseal0807@gmail.com</a>
              </div>
              <a
                href="/resume/Dipanshu_Resume.pdf"
                download="Dipanshu_Resume.pdf"
                className="btn btn-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
