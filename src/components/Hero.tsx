import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Sparkles, Star } from 'lucide-react';
import { Navbar } from './Navbar';
import { DOCTOR_DATA } from '../data/clinicData';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onIntroComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onIntroComplete }) => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const supportCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // Story sequence refs
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const cardGreetingRef = useRef<HTMLDivElement>(null);
  const cardDoctorRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // State to control navbar entrance
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);

  const onIntroCompleteRef = useRef(onIntroComplete);
  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    if (!heroWrapperRef.current) return;

    let hasTriggeredIntroFinish = false;
    const finishIntro = () => {
      if (!hasTriggeredIntroFinish) {
        hasTriggeredIntroFinish = true;
        setIsNavbarVisible(true);
        if (onIntroCompleteRef.current) {
          onIntroCompleteRef.current();
        }
      }
    };

    const ctx = gsap.context(() => {
      // 1. Initial State for story cards
      gsap.set(cardGreetingRef.current, { opacity: 0, x: -35, scale: 0.9 });
      gsap.set(cardDoctorRef.current, { opacity: 0, x: -35, scale: 0.9 });
      gsap.set(scrollHintRef.current, { opacity: 0, y: 12 });

      // 2. Play the entrance story animation (~2.2s total)
      const introTl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        },
      });

      // Mini Card 1: Greeting ("Hi! 👋")
      introTl.to(
        cardGreetingRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.3
      );

      // Mini Card 2: Doctor Introduction ("I am Dr. Manish Kumar (BDS, MDS)")
      introTl.to(
        cardDoctorRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.95
      );

      // Reveal Navbar, WhatsApp button, and Scroll hint smoothly
      introTl.call(finishIntro, undefined, 1.75);

      introTl.to(
        scrollHintRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        2.05
      );

      // 3. ScrollTrigger Scrollytelling Timeline
      const isMobile = window.innerWidth <= 860;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=160%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Immediate safety fallback: if user scrolls before timer ends, reveal everything immediately
            if (self.progress > 0.01) {
              finishIntro();
            }
          },
        },
      });

      // Step 0: Fade & lift story cards out as scroll begins
      tl.to(
        storyContainerRef.current,
        {
          opacity: 0,
          y: -25,
          scale: 0.95,
          ease: 'power2.in',
          duration: 0.5,
        },
        0
      );

      // Step 1: Left Reveal - Headline takes over
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, x: isMobile ? -20 : -60, y: 20 },
        { opacity: 1, x: 0, y: 0, ease: 'power2.out', duration: 1 },
        0.15
      );

      // Step 2: Right Reveal - Tilted 24/7 Support Card
      tl.fromTo(
        supportCardRef.current,
        { opacity: 0, x: isMobile ? 20 : 60, y: 20, rotate: 0 },
        { opacity: 1, x: 0, y: 0, rotate: isMobile ? 2 : 4, ease: 'power2.out', duration: 1 },
        0.35
      );

      // Step 3: Middle Overlap - Circular "Book Appointment" Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.3, y: 20 },
        { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)', duration: 0.8 },
        0.5
      );

      // Step 4: Bottom Socials Fade In
      tl.fromTo(
        socialsRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 },
        0.7
      );

      // Step 5: Bottom Dock Reveal (clean centering on both desktop and mobile)
      tl.fromTo(
        dockRef.current,
        { opacity: 0, y: isMobile ? 35 : 80, xPercent: isMobile ? 0 : -50 },
        { opacity: 1, y: 0, xPercent: isMobile ? 0 : -50, ease: 'power3.out', duration: 1 },
        isMobile ? 0.55 : 0.85
      );
    }, heroWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-frame-wrapper" ref={heroWrapperRef}>
      <section className="hero-section">
        {/* Glow Layer */}
        <div className="hero-glow-layer" />

        {/* Top Navbar */}
        <Navbar onOpenBooking={onOpenBooking} visible={isNavbarVisible} />

        {/* Center Doctor Portrait */}
        <div className="hero-doctor-container">
          <img
            src="/assets/doctor-hero.png"
            alt={`${DOCTOR_DATA.name} — Principal Dental Surgeon`}
            className="hero-doctor-img"
          />
        </div>

        {/* 🎬 Story Onboarding Mini Cards (Left Side) */}
        <div className="hero-story-container" ref={storyContainerRef}>
          {/* Card 1: Greeting */}
          <div className="story-card-greeting" ref={cardGreetingRef}>
            <span className="story-wave-emoji" role="img" aria-label="Waving hand">👋</span>
            <span className="story-greeting-text">Hi!</span>
          </div>

          {/* Card 2: Doctor Introduction */}
          <div className="story-card-doctor" ref={cardDoctorRef}>
            <div className="story-doctor-icon-box">
              <Stethoscope size={24} />
            </div>
            <div className="story-doctor-details">
              <div className="story-doctor-header-row">
                <span className="story-doctor-badge-tag">Meet Your Dentist</span>
                <span className="story-live-status-pill">
                  <span className="live-pulse-dot" aria-hidden="true" />
                  Available Today
                </span>
              </div>
              <div className="story-doctor-name-row">
                <span className="story-doctor-name">I am {DOCTOR_DATA.name}</span>
                <span className="story-doctor-degrees">(BDS, MDS)</span>
              </div>
            </div>
          </div>

          {/* Interactive Scroll Prompt */}
          <div className="hero-story-scroll-hint" ref={scrollHintRef}>
            <span>Scroll down to explore</span>
            <span className="scroll-hint-arrow" aria-hidden="true">↓</span>
          </div>
        </div>

        {/* Step 1: Main Headline (Middle-Left) */}
        <div className="hero-headline-block" ref={headlineRef}>
          <div className="hero-headline">
            Confidence
            <br />
            starts with
            <br />
            a smile
            <Sparkles className="sparkle-icon sparkle-top" size={32} />
            <Sparkles className="sparkle-icon sparkle-bottom" size={28} />
          </div>
          <div className="hero-accent-bar" />
        </div>

        {/* Step 2: 24/7 Support Card (Top-Right) */}
        <div className="hero-support-card" ref={supportCardRef}>
          <div className="hero-support-iconbox">
            <Stethoscope size={26} />
          </div>
          <div>
            <div className="hero-support-title-row">
              <span className="hero-support-title">24/7 Urgent Care</span>
            </div>
            <div className="hero-support-subtext">
              Direct emergency triage &amp; priority relief whenever you need it.
            </div>
          </div>
        </div>

        {/* Step 3: Overlapping "Book Appointment" Badge */}
        <button
          type="button"
          className="hero-overlap-badge"
          ref={badgeRef}
          onClick={() => onOpenBooking()}
          aria-label="Book Dental Appointment via WhatsApp"
        >
          <div className="badge-pill-container">
            <div className="badge-tooth-iconbox">
              <div className="badge-orbit-ring" aria-hidden="true" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.5 2 6 4 6 7.5C6 9.5 7 11.5 7.5 13C8 14.5 7.5 17 8.5 19.5C9.5 22 10.5 22 11.5 19.5C12 18.5 12 17 12 17C12 17 12 18.5 12.5 19.5C13.5 22 14.5 22 15.5 19.5C16.5 17 16 14.5 16.5 13C17 11.5 18 9.5 18 7.5C18 4 15.5 2 12 2Z" />
              </svg>
            </div>
            <div className="badge-pill-text">
              <span className="badge-pill-title">Book</span>
              <span className="badge-pill-title">Appointment</span>
            </div>
          </div>
        </button>

        {/* Step 4: Bottom Socials (Bottom-Right) */}
        <div className="hero-socials" ref={socialsRef}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn"
            aria-label="Visit BrightSmile on Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn"
            aria-label="Visit BrightSmile on X (Twitter)"
          >
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }} aria-hidden="true">𝕏</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn"
            aria-label="Visit BrightSmile on Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Step 5: Wide Bottom Dock */}
        <div className="hero-bottom-dock" ref={dockRef}>
          {/* Left: 3 Core Services */}
          <div className="dock-services-row">
            <button
              type="button"
              className="dock-service-item"
              onClick={() => onOpenBooking('general-cleaning')}
              aria-label="Book General Dental Care"
            >
              <div className="dock-service-iconbox">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4 6 7.5C6 9.5 7 11.5 7.5 13C8 14.5 7.5 17 8.5 19.5C9.5 22 10.5 22 11.5 19.5C12 18.5 12 17 12 17C12 17 12 18.5 12.5 19.5C13.5 22 14.5 22 15.5 19.5C16.5 17 16 14.5 16.5 13C17 11.5 18 9.5 18 7.5C18 4 15.5 2 12 2Z" />
                </svg>
              </div>
              <div className="dock-service-title">General<br />Care</div>
            </button>

            <button
              type="button"
              className="dock-service-item"
              onClick={() => onOpenBooking('dental-implants')}
              aria-label="Book Dental Implants Consultation"
            >
              <div className="dock-service-iconbox">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4 6 7.5C6 9.5 7 11.5 7.5 13C8 14.5 7.5 17 8.5 19.5C9.5 22 10.5 22 11.5 19.5C12 18.5 12 17 12 17C12 17 12 18.5 12.5 19.5C13.5 22 14.5 22 15.5 19.5C16.5 17 16 14.5 16.5 13C17 11.5 18 9.5 18 7.5C18 4 15.5 2 12 2Z" />
                  <path d="M10 10H14" />
                  <path d="M10 14H14" />
                </svg>
              </div>
              <div className="dock-service-title">Dental<br />Implants</div>
            </button>

            <button
              type="button"
              className="dock-service-item"
              onClick={() => onOpenBooking('teeth-whitening')}
              aria-label="Book Laser Teeth Whitening"
            >
              <div className="dock-service-iconbox">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4 6 7.5C6 9.5 7 11.5 7.5 13C8 14.5 7.5 17 8.5 19.5C9.5 22 10.5 22 11.5 19.5C12 18.5 12 17 12 17C12 17 12 18.5 12.5 19.5C13.5 22 14.5 22 15.5 19.5C16.5 17 16 14.5 16.5 13C17 11.5 18 9.5 18 7.5C18 4 15.5 2 12 2Z" />
                  <path d="M14 7L16 9" />
                  <path d="M8 7L10 9" />
                </svg>
              </div>
              <div className="dock-service-title">Teeth<br />Whitening</div>
            </button>
          </div>

          <div className="dock-divider" aria-hidden="true" />

          {/* Right: Maria Langer Review */}
          <div className="dock-review-box">
            <div className="dock-review-quote">
              “Friendly, supportive and easygoing throughout the whole process.”
            </div>
            <div className="dock-review-author-row">
              <div className="dock-author-info">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Maria Langer"
                  className="dock-author-avatar"
                />
                <span className="dock-author-name">Maria Langer</span>
              </div>
              <div className="dock-review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#ffb300" stroke="#ffb300" />
                ))}
                <span className="dock-rating-val">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
