import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const HeroScene3D = () => {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvasTest = document.createElement('canvas');
    const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId;
    let isVisible = true;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // Renderer with DPR clamping to [1, 1.5] for high performance
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main 3D Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core: Low-poly Icosahedron with Electric Lime Wireframe
    const isMobile = window.innerWidth < 768;
    const coreRadius = isMobile ? 1.6 : 2.0;
    const coreDetail = 1; // clean low-poly facets

    const icosahedronGeo = new THREE.IcosahedronGeometry(coreRadius, coreDetail);
    
    // Wireframe edges
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xC6FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(icosahedronGeo, wireframeMat);
    mainGroup.add(coreMesh);

    // Glowing vertex points
    const pointsMat = new THREE.PointsMaterial({
      color: 0xC6FF3D,
      size: isMobile ? 0.08 : 0.11,
      transparent: true,
      opacity: 0.9
    });
    const corePoints = new THREE.Points(icosahedronGeo, pointsMat);
    mainGroup.add(corePoints);

    // 2. Inner floating ring / Torus
    const torusGeo = new THREE.TorusGeometry(coreRadius * 1.35, 0.015, 12, 48);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xC6FF3D,
      transparent: true,
      opacity: 0.25
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // 3. Orbiting Code Symbol Sprites ({ }, < />, //, ;)
    const codeSymbols = ['{ }', '< / >', '//', ';', 'const', '=>'];
    const spriteGroup = new THREE.Group();
    mainGroup.add(spriteGroup);

    const makeTextSprite = (text) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 128, 64);

      ctx.font = 'bold 32px "Space Grotesk", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#C6FF3D';
      ctx.fillText(text, 64, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.9, 0.45, 1);
      return sprite;
    };

    const orbitSprites = [];
    const symbolCount = isMobile ? 4 : codeSymbols.length;

    for (let i = 0; i < symbolCount; i++) {
      const sprite = makeTextSprite(codeSymbols[i]);
      if (sprite) {
        const angle = (i / symbolCount) * Math.PI * 2;
        const radius = coreRadius * 1.6;
        sprite.position.set(
          Math.cos(angle) * radius,
          (Math.sin(angle * 2) * 0.4),
          Math.sin(angle) * radius
        );
        spriteGroup.add(sprite);
        orbitSprites.push({ sprite, angle, radius, speed: 0.005 + (i * 0.002) });
      }
    }

    // Floating subtle particle dust around the core
    const dustCount = isMobile ? 35 : 70;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 8;
      dustPositions[i + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xC6FF3D,
      size: 0.04,
      transparent: true,
      opacity: 0.4
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    mainGroup.add(dustParticles);

    // Mouse coordinates tracking with inertia lerp
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll reaction tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause rendering when hero is out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Save GPU/CPU when not in view

      const time = clock.getElapsedTime();

      // Smooth mouse rotation lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX + Math.sin(time * 0.5) * 0.05;
      mainGroup.rotation.y = currentRotationY + time * 0.15;

      // Inner torus independent rotation
      torusMesh.rotation.z += 0.008;

      // Orbiting code sprites
      orbitSprites.forEach((item) => {
        item.angle += item.speed;
        item.sprite.position.x = Math.cos(item.angle) * item.radius;
        item.sprite.position.z = Math.sin(item.angle) * item.radius;
        item.sprite.position.y = Math.sin(item.angle * 2 + time) * 0.45;
      });

      // Scroll response: scale down and sink gently on scroll
      const scrollFactor = Math.min(scrollY / 600, 1);
      mainGroup.scale.setScalar(1 - scrollFactor * 0.35);
      mainGroup.position.y = -scrollFactor * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icosahedronGeo.dispose();
      wireframeMat.dispose();
      pointsMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !hasWebGL) {
    return (
      <div className="hero-3d-fallback" aria-hidden="true">
        <div className="fallback-wireframe-globe" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="hero-3d-canvas-container"
      aria-hidden="true"
    />
  );
};

