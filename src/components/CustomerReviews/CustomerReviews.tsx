'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomerReviews.module.css';

const CustomerReviews: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.section
      className={styles.reviewsSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        {/* Clutch Rating */}
        <div className={styles.clutchRating}>
          <h3 className={styles.clutchTitle}>Clutch</h3>
          <div className={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={styles.star}>★</span>
            ))}
            <span className={styles.ratingValue}>4,9</span>
          </div>
        </div>
        
        {/* Review Headline */}
        <div className={styles.headlineContainer}>
          <h2 className={styles.headline}>
            <span className={styles.headlinePrefix}>OUR </span>
            
            <div 
              className={styles.highlightedText}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className={styles.customerReviews}>
                CUSTOMER REVIEWS
              </span>
              
              <motion.div 
                className={styles.underline}
                initial={{ width: '100%' }}
                animate={{ 
                  width: isHovering ? '105%' : '100%',
                  transition: { duration: 0.3 }
                }}
              />
              
              <motion.span
                className={styles.arrow}
                animate={{ 
                  scale: isHovering ? 1.2 : 1,
                  x: isHovering ? 5 : 0,
                  transition: { duration: 0.3 }
                }}
              >
                ⟶
              </motion.span>
            </div>
            
            <span className={styles.headlineSuffix}>
              <br />ARE EXCELLENT
            </span>
          </h2>
          
          <p className={styles.subheadline}>
            Join the success stories!
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerReviews;
