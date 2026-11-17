import React, { useState, useEffect } from 'react';

export const Typewriter = ({ roles, speed = 80, pauseTime = 1800, deleteSpeed = 40 }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles, speed, pauseTime, deleteSpeed]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{currentText}</span>
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
};

