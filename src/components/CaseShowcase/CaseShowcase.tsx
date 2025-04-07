"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
//@ts-ignore
import Slider from "react-slick";
import styles from "./SliderSection.module.css";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  categories: string[]; // Add categories for each slide
}

const slidesData: SlideItem[] = [
  {
    id: 1,
    title: "Calvin Klein",
    subtitle: "An Iconic Shopify Online Store Reborn",
    image: "/slider.webp",
    categories: ["UX Consultancy", "Performance", "Technical SEO & Data Layer"]
  },
  {
    id: 2,
    title: "Gucci",
    subtitle: "Luxury Reimagined for Digital",
    image: "/slider.webp",
    categories: ["Brand Strategy", "E-Commerce", "Custom Development"]
  },
  {
    id: 3,
    title: "Louis Vuitton",
    subtitle: "Heritage Meets Innovation",
    image: "/slider.webp",
    categories: ["UI Design", "Mobile Optimization", "Headless Commerce"]
  },
  {
    id: 4,
    title: "Adidas",
    subtitle: "Performance Driven E-Commerce",
    image: "/slider.webp",
    categories: ["Performance", "Analytics", "User Testing"]
  },
  {
    id: 5,
    title: "Nike",
    subtitle: "Just Shop It",
    image: "/slider.webp",
    categories: ["Conversion Rate", "UX Research", "Frontend Development"]
  }
];

const SliderSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Custom cursor states
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorZone, setCursorZone] = useState<"left" | "right" | "center">("center");
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check device type on mount and resize
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDeviceType();
    
    // Use debounced resize event for better performance
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDeviceType, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Handle cursor visibility with additional touch device detection
  useEffect(() => {
    // Function to check if device has touch capability
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);
    
    // If it's a touch device but we still want custom cursor
    if (isTouchDevice()) {
      setCursorVisible(true); // Always show cursor on touch devices
    }
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      
      // For touch devices, add touch event listeners
      if (isTouchDevice()) {
        const handleTouch = (e: TouchEvent) => {
          if (e.touches[0]) {
            const touch = e.touches[0];
            setCursorPos({ x: touch.clientX, y: touch.clientY });
            
            // Determine zone
            const rect = container.getBoundingClientRect();
            const relativeX = touch.clientX - rect.left;
            const zoneWidth = rect.width / 3;
            
            if (relativeX < zoneWidth) {
              setCursorZone("left");
            } else if (relativeX > 2 * zoneWidth) {
              setCursorZone("right");
            } else {
              setCursorZone("center");
            }
          }
        };
        
        container.addEventListener("touchmove", handleTouch);
        container.addEventListener("touchstart", handleTouch);
        
        return () => {
          container.removeEventListener("touchmove", handleTouch);
          container.removeEventListener("touchstart", handleTouch);
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Optimized mouse movement handler using throttling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Calculate cursor position
    const xPos = e.clientX;
    const yPos = e.clientY;
    
    // Update cursor position using requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setCursorPos({ x: xPos, y: yPos });
      
      // Determine zone (left third, center third, right third)
      const rect = containerRef.current!.getBoundingClientRect();
      const relativeX = xPos - rect.left;
      const zoneWidth = rect.width / 3;
      
      let newZone: "left" | "right" | "center" = "center";
      if (relativeX < zoneWidth) {
        newZone = "left";
      } else if (relativeX > 2 * zoneWidth) {
        newZone = "right";
      }
      
      if (newZone !== cursorZone) {
        setCursorZone(newZone);
      }
      
      // Force cursor visibility when moving
      if (!cursorVisible) {
        setCursorVisible(true);
      }
    });
  };

  // Click handler for navigation
  const handleClick = () => {
    if (cursorZone === "left") {
      sliderRef.current?.slickPrev();
    } else if (cursorZone === "right") {
      sliderRef.current?.slickNext();
    } else {
      // Center zone action - view case details
      console.log("View case clicked:", slidesData[currentSlide].title);
    }
  };

  // Memoize cursor class for better performance
  const cursorClass = useMemo(() => {
    if (!cursorVisible) return styles.cursorHidden;
    
    switch (cursorZone) {
      case "left":
        return styles.cursorLeft;
      case "right":
        return styles.cursorRight;
      case "center":
        return styles.cursorCenter;
      default:
        return "";
    }
  }, [cursorVisible, cursorZone]);

  // Dynamic slider settings based on device type
  const getCenterPadding = () => {
    if (isMobile) return '20px';
    if (isTablet) return '60px';
    return '300px';
  };

  // Memoize slider settings to prevent unnecessary re-renders
  const settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: getCenterPadding(),
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    cssEase: "cubic-bezier(0.23, 1, 0.32, 1)", // Add smooth easing
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '60px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '20px'
        }
      }
    ]
  }), [isMobile, isTablet, getCenterPadding]);

  // Get current slide categories
  const currentCategories = slidesData[currentSlide]?.categories || [];

  return (
    <div
      ref={containerRef}
      className={styles.sliderContainer}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className={styles.sliderWrapper}>
        <Slider ref={sliderRef} {...settings} className={styles.slider}>
          {slidesData.map((slide) => (
            <div key={slide.id} className={styles.slide}>
              <div className={styles.laptopMockup}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.slideImage}
                  loading="eager" // Ensure images are loaded quickly
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slide information */}
      <div className={`${styles.slideInfo} ${isMobile ? styles.mobileInfo : ''}`}>
        <h2 className={styles.slideTitle}>
          {slidesData[currentSlide]?.title}
        </h2>
        <p className={styles.slideSubtitle}>
          {slidesData[currentSlide]?.subtitle}
        </p>
      </div>

      {/* Bottom navigation with dynamic categories */}
      <div className={`${styles.bottomNav} ${isMobile ? styles.mobileNav : ''}`}>
        <div className={styles.pagination}>
          <span className={styles.currentPage}>{currentSlide + 1}</span>
          <span className={styles.pageDivider}>—</span>
          <span className={styles.totalPages}>{slidesData.length}</span>
        </div>
        
        <div className={styles.categoryButtons}>
          {currentCategories.map((category, index) => (
            <button key={`${currentSlide}-${index}`} className={styles.categoryButton}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Custom cursor - fixed positioning with will-change optimization */}
      <div
        className={`${styles.customCursor} ${cursorClass}`}
        style={{
          position: 'fixed',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          willChange: 'transform' // Optimize for animations
        }}
      >
        {cursorZone === "left" && (
          <div className={styles.cursorCircle}>
            <span className={styles.cursorArrow}>←</span>
          </div>
        )}
        {cursorZone === "right" && (
          <div className={styles.cursorCircle}>
            <span className={styles.cursorArrow}>→</span>
          </div>
        )}
        {cursorZone === "center" && (
          <span className={styles.viewCase}>View case</span>
        )}
      </div>
    </div>
  );
};

export default SliderSection;