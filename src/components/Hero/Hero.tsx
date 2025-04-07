'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Enhanced button animation using mouse position
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* First row - HEADLESS with gear icon */}
            <div className={styles.headlessRow}>
              <span className={styles.headless}>HEADLESS</span>
              <Image 
                src="/hero1.svg"
                alt="Gear"
                width={140}
                height={140}
                className={styles.gearIcon}
              />
            </div>
            
            {/* Second row - Device icon and COMMERCE */}
            <div className={styles.commerceRow}>
              <div className={styles.deviceContainer}>
                <Image 
                  src="/hero2.svg"
                  alt="Headless Device"
                  width={160}
                  height={160}
                  className={styles.deviceIcon}
                />
              </div>
              <span className={styles.commerce}>COMMERCE</span>
            </div>
            
            {/* Third row - AGENCY */}
            <div className={styles.agencyRow}>
              <span className={styles.agency}>AGENCY</span>
              <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className={styles.ctaButton}
              ref={buttonRef}
            >
              <span className={styles.ctaText}>REQUEST A QUOTE</span>
              <span className={styles.ctaBubble}></span>
              <span className={styles.ctaPulse}></span>
              <span className={styles.ctaGlow}></span>
            </Link>
          </motion.div>
            </div>
          </motion.div>
          
          {/* CTA Button with enhanced animation */}
          
        </div>
        
        <motion.div
          className={styles.bottomContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={styles.clutchRating}>
            <div className={styles.clutchLogo}>
              <svg width="91" height="26" viewBox="0 0 91 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6387 0H27.8211V25.8461H23.6387V0Z" fill="white" />
                <path d="M42.3684 17.6554C42.3684 21.6597 39.0952 22.0238 38.0041 22.0238C35.4583 22.0238 35.0946 19.6576 35.0946 18.3834V8.37262H30.9121V18.2014C30.9121 20.5676 31.6395 22.7518 33.0943 24.0259C34.3672 25.3 36.0038 25.8461 38.0041 25.8461C39.4589 25.8461 41.2773 25.482 42.3684 24.3899V25.8461H46.5509V8.37262H42.3684V17.6554Z" fill="white" />
                <path d="M54.7348 2.00214H50.5523V8.37266H47.4609V12.377H50.5523V25.8461H54.7348V12.377H57.8262V8.37266H54.7348V2.00214Z" fill="white" />
                <path d="M70.9202 20.5677C70.011 21.2958 68.7381 21.8418 67.4652 21.8418C64.5556 21.8418 62.5553 19.6576 62.5553 16.7454C62.5553 13.8331 64.5556 11.831 67.4652 11.831C68.7381 11.831 70.011 12.195 70.9202 13.1051L71.4658 13.6511L74.3753 10.9209L73.6479 10.3749C72.0113 8.91874 69.8292 8.00867 67.4652 8.00867C62.3735 8.00867 58.5547 11.831 58.5547 16.9274C58.5547 22.0238 62.3735 25.8461 67.4652 25.8461C69.8292 25.8461 72.0113 24.9361 73.6479 23.4799L74.3753 22.9339L71.4658 20.0217L70.9202 20.5677Z" fill="white" />
                <path d="M89.1042 9.82882C87.8313 8.55471 86.5584 8.00867 84.5581 8.00867C83.1033 8.00867 81.6485 8.37269 80.5575 9.46478V0H76.375V25.8461H80.5575V16.1993C80.5575 12.195 83.2852 11.831 84.3762 11.831C86.9221 11.831 86.7402 14.1972 86.7402 15.4713V25.6641H90.9227V15.6533C90.9227 13.2871 90.3772 11.1029 89.1042 9.82882Z" fill="white" />
                <path d="M67.2846 19.8397C68.8915 19.8397 70.1942 18.5358 70.1942 16.9274C70.1942 15.3191 68.8915 14.0152 67.2846 14.0152C65.6777 14.0152 64.3751 15.3191 64.3751 16.9274C64.3751 18.5358 65.6777 19.8397 67.2846 19.8397Z" fill="white" />
                <path d="M17.8209 19.4756C16.3662 20.9317 14.184 21.8418 11.82 21.8418C7.27385 21.8418 4.00062 18.2015 4.00062 13.2871C4.00062 8.37268 7.27385 4.73238 12.0019 4.73238C14.184 4.73238 16.3662 5.64245 18.0028 7.28059L18.5483 7.82663L21.276 5.09641L20.7305 4.55036C18.3665 2.18417 15.2751 0.91006 12.0019 0.91006C5.09169 0.728045 0 6.1885 0 13.2871C0 20.3857 5.09169 25.8461 11.82 25.8461C15.0932 25.8461 18.3665 24.572 20.5486 22.2058L21.0942 21.6598L18.3665 18.9296L17.8209 19.4756Z" fill="white" />
              </svg>
            </div>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
              <span className={styles.rating}>4,9</span>
            </div>
          </div>
          
          <div className={styles.tagline}>
            We build CMS websites and content-rich<br className={styles.desktopBreak} />
            eCommerce platforms for businesses<br className={styles.desktopBreak} />
            with complex needs
          </div>
          
          <div className={styles.socialLinks}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://twitter.com" className={styles.socialLink}>X</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://linkedin.com" className={styles.socialLink}>LI</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://facebook.com" className={styles.socialLink}>FB</Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;