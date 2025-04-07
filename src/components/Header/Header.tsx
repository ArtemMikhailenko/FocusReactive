'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.navItem}`)) {
        setServicesOpen(false);
        setWorksOpen(false);
      }
    };
    
    document.addEventListener('click', closeDropdowns);
    
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  // Services dropdown items
  const servicesItems = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'UI/UX Design', href: '/services/design' },
    { name: 'Consulting', href: '/services/consulting' },
  ];

  // Works dropdown items
  const worksItems = [
    { name: 'Case Studies', href: '/works/case-studies' },
    { name: 'Projects', href: '/works/projects' },
    { name: 'Testimonials', href: '/works/testimonials' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/images/logo.svg" 
              alt="Focus Reactive" 
              width={165} 
              height={40} 
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <button 
              className={styles.navButton} 
              onClick={(e) => {
                e.stopPropagation();
                setServicesOpen(!servicesOpen);
                setWorksOpen(false);
              }}
              aria-expanded={servicesOpen}
            >
              <span className={styles.navText}>Services</span>
              <span className={`${styles.arrow} ${servicesOpen ? styles.arrowUp : ''}`}>▼</span>
            </button>
            {servicesOpen && (
              <div className={styles.dropdown}>
                {servicesItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={styles.dropdownItem}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/technologies" className={styles.navLink}>
            <span className={styles.navText}>Technologies</span>
          </Link>
          
          <div className={styles.navItem}>
            <button 
              className={styles.navButton} 
              onClick={(e) => {
                e.stopPropagation();
                setWorksOpen(!worksOpen);
                setServicesOpen(false);
              }}
              aria-expanded={worksOpen}
            >
              <span className={styles.navText}>Our Works</span>
              <span className={`${styles.arrow} ${worksOpen ? styles.arrowUp : ''}`}>▼</span>
            </button>
            {worksOpen && (
              <div className={styles.dropdown}>
                {worksItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={styles.dropdownItem}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/careers" className={styles.navLink}>
            <span className={styles.navText}>Careers</span>
          </Link>
          
          <Link href="/about" className={styles.navLink}>
            <span className={styles.navText}>About</span>
          </Link>
        </nav>
        
        <div className={styles.contactButton}>
          <Link href="/contact" className={styles.button}>
            Contact Us
          </Link>
        </div>
        
        {/* Burger Menu Button */}
        <button 
          className={`${styles.burgerButton} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
        
        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileNavItem}>
              <button 
                className={styles.mobileNavButton}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <span className={`${styles.arrow} ${servicesOpen ? styles.arrowUp : ''}`}>▼</span>
              </button>
              {servicesOpen && (
                <div className={styles.mobileSubmenu}>
                  {servicesItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className={styles.mobileSubmenuItem}
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/technologies" 
              className={styles.mobileNavLink}
              onClick={toggleMobileMenu}
            >
              Technologies
            </Link>
            
            <div className={styles.mobileNavItem}>
              <button 
                className={styles.mobileNavButton}
                onClick={() => setWorksOpen(!worksOpen)}
              >
                Our Works
                <span className={`${styles.arrow} ${worksOpen ? styles.arrowUp : ''}`}>▼</span>
              </button>
              {worksOpen && (
                <div className={styles.mobileSubmenu}>
                  {worksItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className={styles.mobileSubmenuItem}
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/careers" 
              className={styles.mobileNavLink}
              onClick={toggleMobileMenu}
            >
              Careers
            </Link>
            
            <Link 
              href="/about" 
              className={styles.mobileNavLink}
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className={styles.mobileContactButton}
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;