import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from "framer-motion";

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('light');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'contact', name: 'Contact' }
  ];

  const certificates = [
    {
      id: 0,
      title: "IBM Virtual Internship",
      issuer: "IBM SkillsBuild & Allsoft Solutions",
      date: "January 2026 - May 2026",
      description: "Earned a Project Completion Certificate for successfully completing a 14-week industry-oriented program focused on IBM Cloud and cloud technologies.",
      pdfUrl: "/certificates/ibm-internship-certificate.pdf",
      thumbnail: "/certificates/ibm-thumbnail.jpg"
    },
    {
      id: 1,
      title: "IBM Cloud Computing Virtual Internship",
      issuer: "IBM SkillsBuild",
      date: "February 2026 - March 2026",
      description: "Completed an IBM Virtual Internship in Cloud Computing with hands-on exposure to cloud concepts, IBM technologies, and modern cloud practices.",
      pdfUrl: "/certificates/ibm-virtual.pdf",
      thumbnail: "/certificates/ibm-cloud-thumbnail.jpg"
    },
    {
      id: 2,
      title: "JAVA with DSA",
      issuer: "Apna College",
      date: "June 2025 - Present",
      description: "Comprehensive Java programming with Data Structures and Algorithms",
      pdfUrl: "/certificates/java-dsa-certificate.pdf", // Replace with actual path
      thumbnail: "/certificates/java-dsa-thumbnail.jpg" // You can create thumbnails
    },
    {
      id: 3,
      title: "Technical English for Engineers",
      issuer: "NPTEL - [IIT MADRAS]",
      date: "August - October 2024",
      description: "Professional communication skills for engineering contexts",
      pdfUrl: "/certificates/technical-english-certificate.pdf",
      thumbnail: "/certificates/technical-english-thumbnail.jpg"
    },
    {
      id: 4,
      title: "Developing Soft Skills and Personality",
      issuer: "NPTEL - [IIT KANPUR]",
      date: "August - October 2024",
      description: "Personal development and professional soft skills enhancement",
      pdfUrl: "/certificates/soft-skills-certificate.pdf",
      thumbnail: "/certificates/soft-skills-thumbnail.jpg"
    },
    {
      id: 5,
      title: "Forests and their Management",
      issuer: "NPTEL - [IIT KANPUR]",
      date: "January - April 2025",
      description: "Environmental science and forest conservation principles",
      pdfUrl: "/certificates/forests-management-certificate.pdf",
      thumbnail: "/certificates/forests-management-thumbnail.jpg"
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeCertificate = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCertificateModal && event.target.classList.contains('certificate-modal')) {
        closeCertificate();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCertificateModal]);

  return (
    <div className="portfolio">
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Dipanshu Jaiswal</div>
          <ul className="nav-menu">
            {sections.map(section => (
              <li key={section.id} className="nav-item">
                <a 
                  href={`#${section.id}`}
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Certificate Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="certificate-modal">
          <div className="certificate-modal-content">
            <div className="certificate-modal-header">
              <h3>{selectedCertificate.title}</h3>
              <button className="close-button" onClick={closeCertificate}>×</button>
            </div>
            <div className="certificate-modal-body">
              <div className="certificate-info">
                <p><strong>Issuer:</strong> {selectedCertificate.issuer}</p>
                <p><strong>Date:</strong> {selectedCertificate.date}</p>
                <p><strong>Description:</strong> {selectedCertificate.description}</p>
              </div>
              <div className="pdf-viewer">
                <iframe 
                  src={selectedCertificate.pdfUrl}
                  title={selectedCertificate.title}
                  width="100%"
                  height="500px"
                />
                <div className="pdf-actions">
                  <a 
                    href={selectedCertificate.pdfUrl} 
                    download 
                    className="btn primary"
                  >
                    Download PDF
                  </a>
                  <a 
                    href={selectedCertificate.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn secondary"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      // ... previous imports and state

{/* Hero Section */}
  <section id="home" className="hero">
    <motion.div
        className="hero-content"
        initial={{
          opacity: 0,
          y: 80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
      <h1>Dipanshu Jaiswal</h1>
      <h2>Computer Science Student</h2>
      <p>Passionate about building innovative solutions and eager to learn new technologies to grow throughout my professional journey.</p>
      <div className="hero-buttons">
        <a href="resume/Dipanshu_Resume.pdf" download className="btn primary">
          📄 Download Resume
        </a>
        <a href="#projects" className="btn primary">View My Projects</a>
        <a href="#contact" className="btn secondary">Get In Touch</a>
      </div>
    </motion.div>
  </section>



      {/* About Section */}
      {/* About Section */}
      <section id="about" className="about">
        <motion.div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a Computer Science student at Shri Vaishnav Vidyapeeth Vishwavidyalaya, 
                passionate about building innovative solutions through technology. 
                I have expertise in React.js, Java, and modern web technologies.
                I enjoy working on projects that solve real-world problems and create meaningful impact.
              </p>
              <div className="education">
                <h3>Education</h3>
                <div className="education-item">
                  <h4>Bachelor of Technology in Computer Science</h4>
                  <p>Shri Vaishnav Vidyapeeth Vishwavidyalaya | 2022 – 2026 | CGPA: 7.01/10</p>
                </div>
                <div className="education-item">
                  <h4>Senior Secondary (12th)</h4>
                  <p>Govt. Excellence Higher Secondary School, Ujjain | 2022 | 66.4%</p>
                </div>
                <div className="education-item">
                  <h4>High School (10th)</h4>
                  <p>Govt. Excellence Higher Secondary School, Ujjain | 2020 | 77%</p>
                </div>
              </div>
            </div>
            <div className="about-details">
              <h3>Personal Details</h3>
              <ul>
                <li><strong>Date of Birth:</strong> 8th July 2004</li>
                <li><strong>Languages:</strong> English, Hindi</li>
                <li><strong>Location:</strong> Ujjain, Madhya Pradesh</li>
                <li><strong>Interests:</strong> eSports, Cricket, Music</li>
                <li><strong>Strengths:</strong> Quick Learner, Team Player, Problem Solver</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-list">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">React.js</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Web Technologies</h3>
              <div className="skill-list">
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">Node.js</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Databases</h3>
              <div className="skill-list">
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Arduino</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Professional Skills</h3>
              <div className="skill-list">
                <span className="skill-tag">Problem Solving</span>
                <span className="skill-tag">Team Collaboration</span>
                <span className="skill-tag">Debugging</span>
                <span className="skill-tag">Quick Learning</span>
                <span className="skill-tag">Communication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            {/* Project 1: StudyNotion */}
            <div className="project-card featured">
              {/* <div className="project-badge">Featured Project</div> */}
              <h3>StudyNotion</h3>
              <p className="project-meta">
                Full Stack Learning Management System (LMS)
              </p>
              <p className="project-description">
                StudyNotion is a full-stack Learning Management System (LMS) that enables
                students to enroll in courses, watch video lectures, and track their
                learning progress. Instructors can create, manage, and publish courses
                through a dedicated dashboard.
              </p>
              <div className="tech-stack">
                <span>React.js</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MongoDB</span>
                <span>Tailwind CSS</span>
                <span>Redux Toolkit</span>
                <span>JWT</span>
                <span>Razorpay</span>
                <span>Cloudinary</span>
              </div>
              <ul className="project-features">
                <li>Student & Instructor Authentication using JWT</li>
                <li>Instructor Dashboard for Course Creation & Management</li>
                <li>Video Lectures with Course Progress Tracking</li>
                <li>Razorpay Payment Gateway Integration</li>
                <li>User Profile & Account Management</li>
              </ul>
              <div className="project-links">
                <a
                  href="https://github.com/Dipanshu-Jaiswal/Ed_Tech-StudyNotion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              </div>
            </div>
            {/* Project 2: Sadak-Saathi */}
            <div className="project-card featured">
              {/* <div className="project-badge">Major Project</div> */}
              <h3>Sadak-Saathi: Road Companion App</h3>
              <p className="project-meta">Full Stack Web Application • MERN Stack • Major Academic Project</p>
              <p className="project-description">
                A comprehensive road assistance and navigation app that provides real-time traffic updates, 
                emergency services, mechanic locations, and road safety features for travelers.
              </p>
              <div className="tech-stack">
                <span>React.js</span>
                <span>Node.js</span>
                <span>MySQL</span>
                <span>Google Maps API</span>
                <span>Socket.io</span>
              </div>
              <ul className="project-features">
                <li>Developed real-time traffic monitoring and route optimization system</li>
                <li>Integrated emergency services contact and location sharing</li>
                <li>Built mechanic and service center locator with ratings and reviews</li>
                <li>Implemented user authentication and profile management system</li>
                <li>Created responsive UI with interactive maps and navigation</li>
              </ul>
              <div className="project-links">
                {/* <a href="#" className="project-link">Live Demo</a> */}
                <a 
                  href="https://github.com/dipanshu-jaiswal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              </div>
            </div>
            
            {/* Project 3: Email Classifier */}
            <div className="project-card">
              <h3>Email Classifier [Spam or not-Spam]</h3>
              <p className="project-meta">ML-Based Email Classification System • React.js • Team Project</p>
              <p className="project-description">
                Built the complete frontend interface for an email classification system that detects 
                spam and ham emails using machine learning algorithms.
              </p>
              <div className="tech-stack">
                <span>React.js</span>
                <span>CSS</span>
                <span>MySQL</span>
                <span>Machine Learning</span>
              </div>
              <ul className="project-features">
                <li>Designed and implemented responsive login page and dynamic UI components</li>
                <li>Collaborated with backend team to integrate classifier results</li>
                <li>Ensured smooth user experience across all devices</li>
                <li>Implemented real-time email classification and results display</li>
                <li>Created admin dashboard for system monitoring</li>
              </ul>
              {/* <div className="project-links">
                <a 
                  href="https://github.com/dipanshu-jaiswal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              </div> */}
            </div>

            {/* Project 4: IoT Radar System */}
            <div className="project-card">
              <h3>IoT-Based RADAR System</h3>
              <p className="project-meta">Hardware-Based Object Detection System • Arduino • IoT</p>
              <p className="project-description">
                Designed and implemented a fully functional RADAR system to detect objects using 
                ultrasonic sensors and rotating servo motor with 180° scanning coverage.
              </p>
              <div className="tech-stack">
                <span>Arduino</span>
                <span>Ultrasonic Sensor</span>
                <span>Servo Motor</span>
              </div>
              <ul className="project-features">
                <li>Developed embedded code to measure distance and control motor rotation</li>
                <li>Visualized object position on a virtual radar interface</li>
                <li>Integrated hardware and software for real-time object detection</li>
                <li>Implemented data logging and analysis features</li>
                <li>Achieved 95% accuracy in object detection within 2-meter range</li>
              </ul>
              {/* <div className="project-links">
                <a 
                  href="https://github.com/dipanshu-jaiswal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="certificates">
        <div className="container">
          <h2>Certifications</h2>
          <p className="section-subtitle">
            Here are my professional certifications that validate my skills and knowledge in various domains.
          </p>
          
          <div className="certificates-grid">
            {certificates.map(certificate => (
              <div 
                key={certificate.id} 
                className="certificate-card"
                onClick={() => openCertificate(certificate)}
              >
                <div className="certificate-icon">
                  <span>📜</span>
                </div>
                <div className="certificate-content">
                  <h3>{certificate.title}</h3>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <p className="certificate-date">{certificate.date}</p>
                  <p className="certificate-description">{certificate.description}</p>
                </div>
                <div className="certificate-actions">
                  <button className="view-certificate-btn">
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <strong>Phone:</strong> +91-9755548821
              </div>
              <div className="contact-item">
                <strong>Email:</strong> djaiseal0807@gmail.com
              </div>
              <div className="contact-item">
                <strong>LinkedIn:</strong> 
                <a href="https://www.linkedin.com/in/dipanshu-jaiswal-68a327363" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/dipanshu-jaiswal-68a327363
                </a>
              </div>
              <div className="contact-item">
                <strong>GitHub:</strong> 
                <a href="https://github.com/dipanshu-jaiswal" target="_blank" rel="noopener noreferrer">
                  github.com/dipanshu-jaiswal
                </a>
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 'C' 62/2 Sarthak Nagar, Ujjain, Madhya Pradesh – 456010, India
              </div>
            </div>
            <div className="declaration">
              <h3>Career Objective</h3>
              <p>
                Seeking an opportunity in an organization to build a strong career and develop a valuable skill set. 
                Eager to learn new technologies and grow continuously throughout my professional journey.
              </p>
              <h3>Declaration</h3>
              <p>
                I hereby declare that the information furnished above is true to the best of my knowledge and belief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dipanshu Jaiswal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;