import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { List, X, WhatsappLogo, CalendarPlus } from '@phosphor-icons/react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  visible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, visible = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('');

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Track global reading/scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to dynamically highlight the active section link
  useEffect(() => {
    const sections = ['about', 'services', 'reviews', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 2px Gradient Reading Scroll Progress Bar */}
      <div
        className="top-scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`hero-navbar ${visible ? 'is-intro-visible' : 'is-intro-hidden'}`} role="banner">
        <button
          type="button"
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="BrightSmile Dental Clinic — Scroll to top"
        >
          <img src="/assets/logo.svg" alt="" aria-hidden="true" className="nav-brand-logo" />
          <span className="nav-brand-text">BrightSmile</span>
        </button>

        {/* Desktop Navigation Links with Active Indicator */}
        <nav className="nav-links" aria-label="Main Navigation">
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}
          >
            <span>About</span>
            {activeSection === 'about' && <span className="nav-active-dot" aria-hidden="true" />}
          </a>
          <a
            href="#services"
            className={`nav-link ${activeSection === 'services' ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
          >
            <span>Services</span>
            {activeSection === 'services' && <span className="nav-active-dot" aria-hidden="true" />}
          </a>
          <a
            href="#reviews"
            className={`nav-link ${activeSection === 'reviews' ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('#reviews'); }}
          >
            <span>Stories</span>
            {activeSection === 'reviews' && <span className="nav-active-dot" aria-hidden="true" />}
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            <span>Clinic Info</span>
            {activeSection === 'contact' && <span className="nav-active-dot" aria-hidden="true" />}
          </a>
        </nav>

        {/* Right Action Group */}
        <div className="nav-action-group">
          <button
            type="button"
            className="btn-navy nav-cta"
            onClick={() => onOpenBooking()}
            aria-label="Book a dental visit consultation"
          >
            Book a visit
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Off-Canvas Mobile Navigation Side Panel & Frosted Blur Backdrop (Portaled to document.body) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {mobileMenuOpen && (
              <div
                className="mobile-drawer-overlay"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
            )}
            <aside
              id="mobile-navigation-panel"
              className={`mobile-side-panel ${mobileMenuOpen ? 'is-open' : ''}`}
              role="dialog"
              aria-label="Navigation Menu"
              aria-modal="true"
            >
              <div className="side-panel-header">
                <div className="side-panel-brand">
                  <img src="/assets/logo.svg" alt="" aria-hidden="true" className="side-panel-logo" />
                  <span className="side-panel-title">BrightSmile</span>
                </div>
                <button
                  type="button"
                  className="side-panel-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <nav className="side-panel-nav" aria-label="Mobile Navigation Links">
                <button
                  type="button"
                  className={`side-nav-btn ${activeSection === 'about' ? 'is-active' : ''}`}
                  onClick={() => handleNavClick('#about')}
                >
                  <span>About Dr. Manish</span>
                </button>
                <button
                  type="button"
                  className={`side-nav-btn ${activeSection === 'services' ? 'is-active' : ''}`}
                  onClick={() => handleNavClick('#services')}
                >
                  <span>Dental Services</span>
                </button>
                <button
                  type="button"
                  className={`side-nav-btn ${activeSection === 'reviews' ? 'is-active' : ''}`}
                  onClick={() => handleNavClick('#reviews')}
                >
                  <span>Patient Stories</span>
                </button>
                <button
                  type="button"
                  className={`side-nav-btn ${activeSection === 'contact' ? 'is-active' : ''}`}
                  onClick={() => handleNavClick('#contact')}
                >
                  <span>Clinic Info &amp; Hours</span>
                </button>
              </nav>

              <div className="side-panel-actions">
                <button
                  type="button"
                  className="btn-whatsapp side-action-whatsapp-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                >
                  <WhatsappLogo size={22} weight="fill" className="whatsapp-btn-icon" />
                  <span>Book via WhatsApp</span>
                </button>

                <button
                  type="button"
                  className="btn-navy side-action-consult-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                >
                  <CalendarPlus size={20} weight="bold" />
                  <span>Book a Visit</span>
                </button>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
};

