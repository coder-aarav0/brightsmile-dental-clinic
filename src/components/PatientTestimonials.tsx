import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CaretLeft, CaretRight, Star, ShieldCheck } from '@phosphor-icons/react';
import { CLINIC_REVIEWS } from '../data/clinicData';
import { ReviewItem } from '../types/appointment';

export const PatientTestimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Default to testimonial #3 (index 2 in 0-indexed array)
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(true);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Touch swipe tracking references
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  // Scroll directly to a review by index
  const scrollToReview = useCallback((idx: number, smooth: boolean = true) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.testimonial-card');
    const safeIdx = Math.max(0, Math.min(CLINIC_REVIEWS.length - 1, idx));

    if (cards[safeIdx]) {
      const card = cards[safeIdx] as HTMLElement;
      const containerWidth = container.clientWidth;
      const cardWidth = card.clientWidth;
      const targetScroll = card.offsetLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: smooth ? 'smooth' : 'auto',
      });
      setActiveIndex(safeIdx);
      setCanScrollLeft(safeIdx > 0);
      setCanScrollRight(safeIdx < CLINIC_REVIEWS.length - 1);
    }
  }, []);

  // Check scroll position to keep activeIndex and arrow disabled states updated
  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Identify which card is closest to container center
    const cards = container.querySelectorAll('.testimonial-card');
    const containerCenter = scrollLeft + clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  // On mount: automatically select and scroll to testimonial #3 (index 2) on load
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToReview(2, false);
      checkScrollPosition();
    }, 120);

    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [scrollToReview, checkScrollPosition]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      const prevIdx = Math.max(0, activeIndex - 1);
      scrollToReview(prevIdx, true);
    } else {
      const nextIdx = Math.min(CLINIC_REVIEWS.length - 1, activeIndex + 1);
      scrollToReview(nextIdx, true);
    }
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 45; // Minimum px to trigger intentional card swipe

    if (diffX > swipeThreshold) {
      // Swiped left -> advance to next card
      handleScroll('right');
    } else if (diffX < -swipeThreshold) {
      // Swiped right -> go to previous card
      handleScroll('left');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleScroll('left');
    } else if (e.key === 'ArrowRight') {
      handleScroll('right');
    }
  };

  return (
    <section id="reviews" className="testimonials-section" aria-label="Patient Testimonials">
      <div className="testimonials-header-container">
        <h2 className="testimonials-headline">Don&apos;t just take our word for it</h2>
        <p className="testimonials-subtitle">
          See why 10,000+ patients choose BrightSmile for gentle, precision dental care
        </p>
      </div>

      {/* Carousel Track with Floating Navigation Buttons */}
      <div className="testimonials-carousel-wrapper">
        {/* Left Arrow Button */}
        <button
          type="button"
          className={`testimonial-nav-btn prev-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
          onClick={() => handleScroll('left')}
          aria-label="Scroll testimonials backward"
          disabled={!canScrollLeft}
        >
          <CaretLeft size={22} weight="bold" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className={`testimonial-nav-btn next-btn ${!canScrollRight ? 'is-disabled' : ''}`}
          onClick={() => handleScroll('right')}
          aria-label="Scroll testimonials forward"
          disabled={!canScrollRight}
        >
          <CaretRight size={22} weight="bold" />
        </button>

        {/* Horizontal Scrolling Cards with Touch & Swipe Gestures */}
        <div
          className="testimonials-track"
          ref={scrollContainerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Patient reviews carousel. Swipe or use arrow keys to navigate."
        >
          {CLINIC_REVIEWS.map((review: ReviewItem, idx: number) => (
            <article
              key={review.id}
              className={`testimonial-card ${activeIndex === idx ? 'is-card-active' : ''}`}
              onClick={() => scrollToReview(idx, true)}
            >
              {/* Top Tag Row with Stars & Verified Badge */}
              <div className="testimonial-tag-row">
                <div className="testimonial-card-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} weight="fill" className="card-star-gold" />
                  ))}
                </div>
                <div className="testimonial-badges-group">
                  <span className="testimonial-verified-pill">
                    <ShieldCheck size={13} weight="fill" className="verified-icon" aria-hidden="true" />
                    Verified Patient
                  </span>
                  <span className="testimonial-date-tag">{review.date}</span>
                </div>
              </div>

              {/* Body Quote */}
              <blockquote className="testimonial-quote-wrap">
                <p className="testimonial-quote-text">{review.reviewText}</p>
              </blockquote>

              {/* Author Row */}
              <div className="testimonial-author-row">
                <img
                  src={review.avatar}
                  alt={review.patientName}
                  className="testimonial-author-avatar"
                  loading="lazy"
                  decoding="async"
                />
                <div className="testimonial-author-meta">
                  <h3 className="testimonial-author-name">{review.patientName}</h3>
                  <p className="testimonial-author-role">
                    {review.roleOrLocation || review.treatmentTag}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Navigation Control Bar (Mobile & Desktop with Prev/Next + Dots) */}
        <div className="testimonials-nav-control-bar">
          <button
            type="button"
            className={`testimonial-mobile-nav-btn prev ${!canScrollLeft ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('left')}
            aria-label="Previous review"
            disabled={!canScrollLeft}
          >
            <CaretLeft size={16} weight="bold" />
            <span>Prev</span>
          </button>

          <div className="testimonials-dots-tracker" role="tablist" aria-label="Review pagination">
            {CLINIC_REVIEWS.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Go to review ${idx + 1}`}
                className={`testimonial-dot ${activeIndex === idx ? 'is-active' : ''}`}
                onClick={() => scrollToReview(idx, true)}
              />
            ))}
          </div>

          <button
            type="button"
            className={`testimonial-mobile-nav-btn next ${!canScrollRight ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('right')}
            aria-label="Next review"
            disabled={!canScrollRight}
          >
            <span>Next</span>
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Bottom Credibility Rating Capsule */}
      <div className="testimonials-footer-row">
        <div className="testimonials-rating-capsule">
          <div className="rating-stars-cluster" aria-label="5 out of 5 stars rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} weight="fill" className="rating-star-icon" />
            ))}
          </div>
          <span className="rating-score-label">4.9 average rating</span>
          <span className="rating-capsule-divider" aria-hidden="true">|</span>
          <span className="rating-count-label">1,200+ verified reviews</span>
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials;
