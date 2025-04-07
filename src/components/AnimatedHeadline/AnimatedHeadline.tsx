'use client'
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import styles from './AnimatedHeadline.module.css';

const AnimatedHeadline: React.FC = () => {
  const [badgesVisible, setBadgesVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const controls = useAnimationControls();
  
  // Feature badges with their specific properties
  const featureBadges = [
    {
      id: 'dream-big',
      text: 'DREAM BIG',
      icon: '⟳',
      position: { top: '20%', right: '12%' },
      hoverAnimation: {
        scale: 1.2,
        transition: { duration: 0.4, type: 'spring', stiffness: 300 }
      },
      appearDelay: 0
    },
    {
      id: 'build-fast',
      text: 'BUILD FAST',
      icon: '→',
      position: { top: '35%', left: '10%' },
      hoverAnimation: {
        x: 30,
        transition: { duration: 0.4, type: 'spring', stiffness: 150 }
      },
      appearDelay: 0.1
    },
    {
      id: 'grow-far',
      text: 'GROW FAR',
      icon: '↗',
      position: { bottom: '15%', left: '30%' },
      hoverAnimation: {
        x: 15, 
        y: -15, 
        scale: 1.1,
        transition: { duration: 0.4, type: 'spring', stiffness: 200 }
      },
      appearDelay: 0.2
    }
  ];

  // Run animation sequence
  useEffect(() => {
    if (isInView) {
      // Start the text animation as soon as component is in view
      controls.start("visible");
      
      // Show badges after text animation is complete
      const timer = setTimeout(() => {
        setBadgesVisible(true);
      }, 500); // Adjust timing as needed
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const introVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const lineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  // Badge animation variants
  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 20
    },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        delay: custom, 
        duration: 0.6,
        type: 'spring',
        stiffness: 200
      }
    })
  };

  return (
    <section className={styles.headlineSection}>
      <div className={styles.container} ref={containerRef}>
        <motion.div
          className={styles.textContainer}
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Intro text */}
          <motion.div className={styles.introText} variants={introVariants}>
            WE PROVIDE
          </motion.div>
          
          {/* Main headline */}
          <div className={styles.mainHeadline}>
            <motion.div className={styles.headlineLine} variants={lineVariants}>
              FUTURE-PROOF
            </motion.div>
            <motion.div 
              className={styles.headlineLine} 
              variants={lineVariants}
              custom={1}
            >
              E-COMMERCE SOLUTIONS
            </motion.div>
            <motion.div 
              className={styles.headlineLine} 
              variants={lineVariants}
              custom={2}
            >
              AT OPTIMAL BUDGET
            </motion.div>
          </div>
        </motion.div>
        
        {/* Feature badges */}
        {featureBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={styles.featureBadge}
            style={{
              top: badge.position.top,
              right: badge.position.right,
              bottom: badge.position.bottom,
              left: badge.position.left,
            }}
            variants={badgeVariants}
            custom={badge.appearDelay + 2.0} // Base delay + badge-specific delay
            initial="hidden"
            animate={badgesVisible ? "visible" : "hidden"}
            whileHover={badge.hoverAnimation}
          >
            <span className={styles.badgeIcon}>{badge.icon}</span>
            {badge.text}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedHeadline;