import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    refresh: jest.fn(),
    update: jest.fn()
  }
}));

jest.mock('./hooks/useLenis', () => ({
  useLenis: () => ({ current: null }),
  getLenis: () => null
}));

jest.mock('./components/Hero/HeroScene3D', () => ({
  HeroScene3D: () => <div data-testid="hero-scene-3d" />
}));

beforeEach(() => {
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {}
    };
  };

  HTMLCanvasElement.prototype.getContext = () => null;
});

test('renders portfolio with personal branding, skip link and navigation', () => {
  render(<App />);
  expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();
  const logoElements = screen.getAllByText(/Dipanshu/i);
  expect(logoElements.length).toBeGreaterThan(0);
});

test('renders all major sections including Process, About and Skills', () => {
  render(<App />);
  expect(screen.getAllByText(/ABOUT ME/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/ENGINEERING PROCESS/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/TECHNICAL ARSENAL/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/PROJECTS/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/CERTIFICATIONS/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/GET IN TOUCH/i).length).toBeGreaterThan(0);
});

test('renders dual timeline with education and IBM internships', () => {
  render(<App />);
  expect(screen.getAllByText(/EDUCATION/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/INTERNSHIPS & LEARNING/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Shri Vaishnav Vidyapeeth Vishwavidyalaya/i).length).toBeGreaterThan(0);
});

test('renders engineering process steps', () => {
  render(<App />);
  expect(screen.getAllByText(/PLAN/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/CODE/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/TEST/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/DEPLOY/i).length).toBeGreaterThan(0);
});

test('renders project cards with StudyNotion and Sadak-Saathi', () => {
  render(<App />);
  expect(screen.getAllByText(/StudyNotion/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Sadak-Saathi/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Email Classifier/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/IoT-Based RADAR System/i).length).toBeGreaterThan(0);
});

test('renders contact form fields without any phone disclosure', () => {
  render(<App />);
  expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  // Privacy test: ensure no phone number or phone disclosure exists anywhere
  expect(screen.queryByText(/Phone/i)).not.toBeInTheDocument();
});
