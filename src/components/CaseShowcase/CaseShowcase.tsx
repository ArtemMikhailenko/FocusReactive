"use client";
import React, { useState, useRef, useEffect } from "react";
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
}

const slidesData: SlideItem[] = [
  {
    id: 1,
    title: "Calvin Klein",
    subtitle: "An Iconic Shopify Online Store Reborn",
    image: "/slider.png"
  },
  {
    id: 2,
    title: "Gucci",
    subtitle: "Luxury Reimagined for Digital",
    image: "/slider.png"
  },
  {
    id: 3,
    title: "Louis Vuitton",
    subtitle: "Heritage Meets Innovation",
    image: "/slider.png"
  },
  {
    id: 4,
    title: "Adidas",
    subtitle: "Performance Driven E-Commerce",
    image: "/slider.png"
  },
  {
    id: 5,
    title: "Nike",
    subtitle: "Just Shop It",
    image: "/slider.png"
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
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
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

  // Mouse movement handler with fixed cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Always update cursor position even if we're determining zones
    const xPos = e.clientX;
    const yPos = e.clientY;
    
    setCursorPos({ x: xPos, y: yPos });
    
    // Determine zone (left third, center third, right third)
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const zoneWidth = rect.width / 3;
    
    if (relativeX < zoneWidth) {
      setCursorZone("left");
    } else if (relativeX > 2 * zoneWidth) {
      setCursorZone("right");
    } else {
      setCursorZone("center");
    }
    
    // Force cursor visibility when moving
    if (!cursorVisible) {
      setCursorVisible(true);
    }
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

  // Determine current cursor class
  const getCursorClass = () => {
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
  };

  // Dynamic slider settings based on device type
  const getCenterPadding = () => {
    if (isMobile) return '20px';
    if (isTablet) return '60px';
    return '300px';
  };

  // Slider settings
  const settings = {
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
  };

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

      {/* Bottom navigation */}
      <div className={`${styles.bottomNav} ${isMobile ? styles.mobileNav : ''}`}>
        <div className={styles.pagination}>
          <span className={styles.currentPage}>{currentSlide + 1}</span>
          <span className={styles.pageDivider}>—</span>
          <span className={styles.totalPages}>{slidesData.length}</span>
        </div>
        
        <div className={styles.categoryButtons}>
          <button className={styles.categoryButton}>UX Consultancy</button>
          <button className={styles.categoryButton}>Performance</button>
          <button className={styles.categoryButton}>Technical SEO & Data Layer</button>
        </div>
      </div>

      {/* Custom cursor - fixed positioning */}
      <div
        className={`${styles.customCursor} ${getCursorClass()}`}
        style={{
          position: 'fixed',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
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