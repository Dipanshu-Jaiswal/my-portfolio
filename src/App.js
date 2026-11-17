import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useIntersectionObserver';
import { useLenis } from './hooks/useLenis';

// Critical UI & Layout Components
import { Loader } from './components/Loader/Loader';
import { ScrollProgress } from './components/Common/ScrollProgress';
import { CustomCursor } from './components/Common/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { SkillsMarquee } from './components/Marquee/SkillsMarquee';
import { About } from './components/About/About';
import { Process } from './components/Process/Process';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Certificates } from './components/Certificates/Certificates';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

// Lazy load heavy modal dialogs (only loaded when clicked)
const ResumeModal = lazy(() =>
  import('./components/Hero/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

const SECTIONS = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'process', name: 'Process' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'certificates', name: 'Certificates' },
  { id: 'contact', name: 'Contact' }
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useActiveSection(SECTION_IDS);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const lenisRef = useLenis();

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (lenisRef.current) {
      const element = document.getElementById(sectionId);
      if (element) {
        lenisRef.current.scrollTo(element, { offset: -80 });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="portfolio-app">
      {/* Accessibility: Skip-to-content Link */}
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      {/* 0-100% Loader with curtain clip-path reveal */}
      <Loader />

      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Creative cursor follower */}
      <CustomCursor />

      {/* Smart Navbar (hide on scroll down, show on up, fullscreen mobile menu) */}
      <Navbar
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Landmark */}
      <main id="main-content">
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Skills velocity-reactive infinite marquee */}
        <SkillsMarquee />

        {/* About with word-by-word reveal & two-column dual timeline */}
        <About />

        {/* 4-step engineering process (Plan, Code, Test, Deploy) */}
        <Process />

        {/* Technical arsenal cards with 3D tilt & lime border glow */}
        <Skills />

        {/* Projects */}
        <Projects />

        {/* Certificates */}
        <Certificates />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer Landmark */}
      <Footer />

      {/* Resume Preview Modal (Lazy Loaded on click) */}
      {resumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
