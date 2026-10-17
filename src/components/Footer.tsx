import React from 'react';
import {
  MapPin,
  PhoneCall,
  Clock,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  FirstAidKit,
  FacebookLogo,
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { DOCTOR_DATA } from '../data/clinicData';

interface FooterProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="modern-clinic-footer" role="contentinfo" aria-label="Clinic Footer">
      {/* Background Radial Glow Accents */}
      <div className="footer-ambient-glow glow-left" aria-hidden="true" />
      <div className="footer-ambient-glow glow-right" aria-hidden="true" />

      <div className="footer-container">
        {/* 4-Column Responsive Grid */}
        <div className="footer-grid-4col">
          {/* Column 1: Brand, Mission & Glassmorphic Socials */}
          <div className="footer-col col-brand">
            <div className="footer-brand-header">
              <img src="/assets/logo.svg" alt="BrightSmile Dental Clinic" className="footer-logo-img" />
              <span className="footer-brand-title">BrightSmile</span>
            </div>

            <p className="footer-brand-mission">
              Modern, anxiety-free dental care powered by advanced diagnostics and AIIMS-certified expertise.
            </p>

            {/* Subtle Glassmorphism Hover Social Media Icons */}
            <div className="footer-social-cluster" aria-label="Social media links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-social"
                aria-label="BrightSmile on Facebook"
              >
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-social"
                aria-label="BrightSmile on X (Twitter)"
              >
                <XLogo size={18} weight="bold" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-social"
                aria-label="BrightSmile on Instagram"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-social"
                aria-label="BrightSmile on LinkedIn"
              >
                <LinkedinLogo size={18} weight="bold" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-social"
                aria-label="BrightSmile on YouTube"
              >
                <YoutubeLogo size={18} weight="bold" />
              </a>
            </div>

            {/* DCI Verification Trust Pill */}
            <div className="footer-trust-pill">
              <ShieldCheck size={15} weight="fill" className="trust-pill-icon" aria-hidden="true" />
              <span>DCI Reg. DDC / A-8421 &bull; AIIMS Alumnus</span>
            </div>
          </div>

          {/* Column 2: Quick Links (Concise, Clean Typography) */}
          <div className="footer-col col-links">
            <h3 className="footer-col-heading">Quick Navigation</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="footer-nav-link">
                  <span>Dental Services</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} className="footer-nav-link">
                  <span>About Dr. Manish</span>
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => { e.preventDefault(); handleNavClick('#reviews'); }} className="footer-nav-link">
                  <span>Patient Stories</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('teeth-whitening')}
                  className="footer-nav-link text-btn"
                >
                  <span>Teeth Whitening</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('dental-implants')}
                  className="footer-nav-link text-btn"
                >
                  <span>Dental Implants</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('root-canal-treatment')}
                  className="footer-nav-link text-btn"
                >
                  <span>Root Canal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Unboxed Operating Shifts */}
          <div className="footer-col col-contact">
            <h3 className="footer-col-heading">Contact & Hours</h3>

            {/* Address */}
            <div className="footer-contact-item">
              <MapPin size={19} weight="fill" className="footer-contact-icon" aria-hidden="true" />
              <div className="contact-item-text">
                <span className="contact-primary-text">{DOCTOR_DATA.address}</span>
                <span className="contact-secondary-text">Metro Pillar 142 &bull; Dedicated Valet Parking</span>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="footer-contact-item">
              <PhoneCall size={19} weight="fill" className="footer-contact-icon" aria-hidden="true" />
              <div className="contact-item-text">
                <a href={`tel:${DOCTOR_DATA.phone}`} className="contact-primary-link">
                  {DOCTOR_DATA.phone}
                </a>
                <span className="contact-secondary-text">Front Desk &amp; Consultation</span>
              </div>
            </div>

            {/* Clean Box-Free Operating Shifts */}
            <div className="footer-hours-block">
              <div className="hours-block-header">
                <Clock size={16} weight="bold" className="hours-clock-icon" aria-hidden="true" />
                <span className="hours-title">Operating Shifts</span>
                <span className="live-status-beacon">
                  <span className="status-dot-pulse" aria-hidden="true" />
                  Open Today
                </span>
              </div>
              <div className="hours-schedule-row">
                <span className="schedule-day">Mon &ndash; Sat:</span>
                <span className="schedule-time">10:00 AM &ndash; 01:30 PM &bull; 05:00 PM &ndash; 08:30 PM</span>
              </div>
              <div className="hours-schedule-row">
                <span className="schedule-day">Sunday:</span>
                <span className="schedule-time">10:30 AM &ndash; 02:00 PM (Emergency only)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Sleek Emergency Button & Minimalist Map Widget */}
          <div className="footer-col col-emergency">
            <h3 className="footer-col-heading">Urgent Care & Location</h3>

            {/* Sleek, High-Contrast Emergency Dental Care CTA Button */}
            <div className="emergency-action-wrapper">
              <a
                href={`tel:${DOCTOR_DATA.phone}`}
                className="emergency-sleek-btn"
                aria-label="Call Emergency Dental Care Line"
              >
                <div className="emergency-btn-pulse-dot" aria-hidden="true" />
                <FirstAidKit size={18} weight="bold" aria-hidden="true" />
                <span>Emergency Dental Care</span>
              </a>
            </div>

            {/* Clean Minimalist Map Widget */}
            <div className="footer-map-widget">
              <iframe
                title="BrightSmile Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114885880757!2d77.1200!3d28.6500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d039230500001%3A0x6b099b24019a3b60!2sRajouri%20Garden%2C%20New%20Delhi%2C%20Delhi%20110027!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="minimalist-map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay-footer">
                <span className="map-landmark-label">Ring Road Clinic</span>
                <a
                  href="https://maps.google.com/?q=New+Delhi+Ring+Road+Metro+Station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-directions-link"
                >
                  <span>Directions</span>
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-text">
            &copy; {new Date().getFullYear()} BrightSmile Dental Clinic. All Rights Reserved. Compliant with DCI &amp; Bio-Medical Waste Management Rules.
          </div>

          <div className="footer-bottom-links">
            <span className="bottom-link-item">Hospital-Grade Sterilization</span>
            <span className="bottom-divider" aria-hidden="true">&bull;</span>
            <span className="bottom-link-item">Transparent Pricing</span>
            <span className="bottom-divider" aria-hidden="true">&bull;</span>
            <button
              type="button"
              className="footer-back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
