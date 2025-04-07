'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollMetrics.module.css';

// Register ScrollTrigger plugin if window is defined
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define TypeScript interfaces
interface MetricData {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  label: [string, string];
}

const ScrollMetrics: React.FC = () => {
  // Define refs with proper types
  const sectionRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const dollarsRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Metrics data
  const metricsData: MetricData[] = [
    { id: 'percentage', value: 35, prefix: '', suffix: '%', label: ['Conversion', 'Rate'] },
    { id: 'dollars', value: 1200, prefix: '$', suffix: '', label: ['Customer', 'Lifetime Value'] },
    { id: 'performance', value: 100, prefix: '', suffix: '', label: ['Website', 'Performance'] }
  ];

  // Check device type on mount and resize
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Animation setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to animate counter using GSAP
    const animateCounter = (
      ref: React.RefObject<HTMLDivElement>, 
      start: number, 
      end: number, 
      prefix: string, 
      suffix: string, 
      delay: number
    ) => {
      const obj = { value: start };
      gsap.to(obj, {
        value: end,
        duration: 1.5,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.innerHTML = `${prefix}${Math.floor(obj.value)}${suffix}`;
          }
        }
      });
    };

    // Get references to elements
    const elements = {
      percentage: percentageRef.current,
      dollars: dollarsRef.current,
      performance: performanceRef.current,
      labels: labelsRef.current.filter(Boolean) // Filter out any null values
    };

    // Different trigger points for mobile and desktop
    const triggerPoints = isMobile 
      ? { first: "top 45%", second: "top 35%", third: "top 5%" } 
      : { first: "top 45%", second: "top 35%", third: "top 5%" };

    // Section entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true
        }
      }
    );

    // Animation for first metric
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: triggerPoints.first,
      onEnter: () => {
        gsap.to(elements.percentage, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        gsap.to(elements.labels[0], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1
        });
        //@ts-ignore
        animateCounter(percentageRef, 0, 35, '', '%', 0);
      },
      onLeaveBack: () => {
        gsap.to(elements.percentage, { opacity: 0, y: 100, duration: 0.5 });
        gsap.to(elements.labels[0], { opacity: 0, y: 50, duration: 0.3 });
      }
    });

    // Animation for second metric
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: triggerPoints.second,
      onEnter: () => {
        gsap.to(elements.dollars, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        });
        gsap.to(elements.labels[1], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1
        });
                //@ts-ignore

        animateCounter(dollarsRef, 0, 1200, '$', '', 0);
      },
      onLeaveBack: () => {
        gsap.to(elements.dollars, { opacity: 0, y: 100, duration: 0.5 });
        gsap.to(elements.labels[1], { opacity: 0, y: 50, duration: 0.3 });
      }
    });

    // Animation for third metric
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: triggerPoints.third,
      onEnter: () => {
        gsap.to(elements.performance, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        });
        gsap.to(elements.labels[2], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1
        });
                //@ts-ignore

        animateCounter(performanceRef, 0, 100, '', '', 0);
      },
      onLeaveBack: () => {
        gsap.to(elements.performance, { opacity: 0, y: 100, duration: 0.5 });
        gsap.to(elements.labels[2], { opacity: 0, y: 50, duration: 0.3 });
      }
    });

    // Cleanup: destroy all ScrollTriggers when unmounting
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={styles.metricsSection}>
      <div className={styles.container}>
        {/* Left side - metric values */}
        <div className={styles.metricsStack}>
          <div ref={percentageRef} className={`${styles.metricValue} ${styles.percentage}`}>35%</div>
          <div ref={dollarsRef} className={`${styles.metricValue} ${styles.dollars}`}>$1200</div>
          <div ref={performanceRef} className={`${styles.metricValue} ${styles.performance}`}>100</div>
        </div>
        
        {/* Right side - labels */}
        <div className={styles.labelsContainer}>
          {metricsData.map((metric, index) => (
            <div 
              key={metric.id}
              ref={(el) => { labelsRef.current[index] = el; }}
              className={styles.metricLabel}
            >
              <span className={styles.labelLine}>{metric.label[0]}</span>
              <span className={styles.labelLine}>{metric.label[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollMetrics;