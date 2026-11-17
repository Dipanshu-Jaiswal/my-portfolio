import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`section-header-wrapper ${align === 'left' ? 'text-left' : 'text-center'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-title-inner"
      >
        <h2 className="section-heading">{title}</h2>
        <motion.div
          className="section-title-bar"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: align === 'left' ? 0 : 0.5 }}
        />
      </motion.div>
      {subtitle && (
        <motion.p
          className="section-subheading"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

