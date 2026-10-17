import React, { useEffect, useRef, useState } from 'react';
import {
  Stethoscope,
  SealCheck,
  ShieldCheck,
  Scan,
  CheckCircle,
  ArrowRight,
  Sparkle as SparkleIcon,
} from '@phosphor-icons/react';
import { DOCTOR_DATA } from '../data/clinicData';

interface AboutDoctorProps {
  onOpenBooking: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-doctor-section"
      aria-label="About Principal Dentist"
    >
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Portrait with Glassmorphic Badges */}
          <div className="doctor-media-col">
            <div className="doctor-card-frame">
              <img
                src="/assets/doctor-hero.webp"
                alt={`${DOCTOR_DATA.name} — Principal Dental Surgeon`}
                className="doctor-profile-img"
                loading="lazy"
                decoding="async"
              />
              <div className="doctor-gradient-scrim" />
              <div className="doctor-specular-glare" aria-hidden="true" />

              {/* Minimalistic Glass Pill Trust Badge with Live Pulse */}
              <div className="doctor-seal-pill">
                <span className="seal-live-pulse-dot" aria-hidden="true" />
                <SealCheck size={18} weight="fill" className="seal-pill-icon" aria-hidden="true" />
                <span className="seal-pill-label">DCI Council Verified</span>
                <span className="seal-pill-divider" aria-hidden="true">•</span>
                <span className="seal-pill-code">Reg. A-8421</span>
              </div>

              {/* Floating Glassmorphic Doctor Profile Card */}
              <div className="doctor-floating-badge glass-panel">
                <div className="badge-doctor-name">{DOCTOR_DATA.name}</div>
                <div className="badge-doctor-qual">{DOCTOR_DATA.degrees}</div>
                <div className="badge-doctor-inst">{DOCTOR_DATA.institution}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy & 4 Guarantees */}
          <div className="about-content-col">
            <div className="section-badge">
              <Stethoscope size={15} weight="duotone" aria-hidden="true" />
              <span>Meet Your Principal Surgeon</span>
            </div>

            <h2 className="section-title">
              Precision Dental Surgery With A Calm, Human Touch
            </h2>

            <p className="about-paragraph">
              “My mission at BrightSmile is straightforward: eliminate fear, ambiguity, and discomfort from dental care. Every treatment plan is guided by high-definition 3D digital imaging, conservative biological preservation, and computerized local anesthesia so you feel completely relaxed from start to finish.”
            </p>

            <div className={`doctor-pledges-grid ${hasAnimated ? 'is-visible' : ''}`}>
              <div className="pledge-card glass-card" style={{ '--card-index': 0 } as React.CSSProperties}>
                <div className="pledge-card-header">
                  <div className="pledge-iconbox">
                    <SparkleIcon size={22} weight="duotone" />
                  </div>
                  <span className="pledge-card-number">01</span>
                </div>
                <div className="pledge-text-wrap">
                  <h4 className="pledge-title">Computerized Pain-Free Anesthesia</h4>
                  <p className="pledge-desc">
                    Micro-controlled electronic delivery eliminating the traditional needle sting and post-treatment facial numbness.
                  </p>
                </div>
              </div>

              <div className="pledge-card glass-card" style={{ '--card-index': 1 } as React.CSSProperties}>
                <div className="pledge-card-header">
                  <div className="pledge-iconbox">
                    <ShieldCheck size={22} weight="duotone" />
                  </div>
                  <span className="pledge-card-number">02</span>
                </div>
                <div className="pledge-text-wrap">
                  <h4 className="pledge-title">100% Class-B Autoclave Protocol</h4>
                  <p className="pledge-desc">
                    Hospital-grade vacuum sterilization where sealed surgical instrument packs are only unsealed chairside in front of you.
                  </p>
                </div>
              </div>

              <div className="pledge-card glass-card" style={{ '--card-index': 2 } as React.CSSProperties}>
                <div className="pledge-card-header">
                  <div className="pledge-iconbox">
                    <Scan size={22} weight="duotone" />
                  </div>
                  <span className="pledge-card-number">03</span>
                </div>
                <div className="pledge-text-wrap">
                  <h4 className="pledge-title">Zero-Gag Optical 3D Scans</h4>
                  <p className="pledge-desc">
                    Micron-accurate digital impressions captured in under 60 seconds, replacing uncomfortable rubber molds entirely.
                  </p>
                </div>
              </div>

              <div className="pledge-card glass-card" style={{ '--card-index': 3 } as React.CSSProperties}>
                <div className="pledge-card-header">
                  <div className="pledge-iconbox">
                    <CheckCircle size={22} weight="duotone" />
                  </div>
                  <span className="pledge-card-number">04</span>
                </div>
                <div className="pledge-text-wrap">
                  <h4 className="pledge-title">Zero-Overtreatment Guarantee</h4>
                  <p className="pledge-desc">
                    Transparent intraoral camera tours so you visually inspect every tooth before agreeing to any clinical procedure.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-cta-row">
              <button
                type="button"
                className="about-cta-btn"
                onClick={onOpenBooking}
                aria-label={`Schedule Consultation with ${DOCTOR_DATA.name}`}
              >
                <span>Schedule Consultation With Dr. Manish</span>
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
