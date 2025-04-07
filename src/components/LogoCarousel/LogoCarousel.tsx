'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './LogoCarousel.module.css';

const logos = [
  {
    id: 'easypark',
    name: 'EasyPark',
    imageUrl: '/partner/logo1.png',
    width: 118,
    height: 29
  },
  {
    id: 'tipico',
    name: 'Tipico',
    imageUrl: '/partner/logo2.png',
    width: 92,
    height: 30
  },
  {
    id: 'caleffi',
    name: 'Caleffi',
    imageUrl: '/partner/logo3.png',
    width: 98,
    height: 59
  },
  {
    id: 'trafficguard',
    name: 'Traffic Guard',
    imageUrl: '/partner/logo4.png',
    width: 122,
    height: 61
  },
  {
    id: 'gitnation',
    name: 'Git Nation',
    imageUrl: '/partner/logo5.png',
    width: 114,
    height: 40
  },
  {
    id: 'secretescapes',
    name: 'Secret Escapes',
    imageUrl: '/partner/logo6.png',
    width: 123,
    height: 35
  },
  {
    id: 'bargreen',
    name: 'Bargreen Ellingson',
    imageUrl: '/partner/logo7.png',
    width: 132,
    height: 50
  }
];

interface LogoCarouselProps {
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate logos to ensure we have enough for a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  // Calculate animation duration based on speed
  // Lower speed value = faster animation
  const animationDuration = 85 * (30 / speed);
  
  // Determine animation direction
  const animationStyle = {
    animationDuration: `${animationDuration}s`,
    animationDirection: reverse ? 'reverse' : 'normal'
  };

  return (
    <div 
      className={styles.carouselContainer} 
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div 
        className={`${styles.innerCarousel} ${isPaused ? styles.paused : ''}`}
        style={animationStyle}
      >
        <div className={styles.logoTrack}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className={styles.logoWrapper}>
              <Image
                src={logo.imageUrl}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate the track for continuous flow */}
        <div className={styles.logoTrack}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-second-${index}`} className={styles.logoWrapper}>
              <Image
                src={logo.imageUrl}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;