import React, { useRef, useState, useEffect } from 'react';
import { CaretLeft, CaretRight, Star, ShieldCheck } from '@phosphor-icons/react';
import { CLINIC_REVIEWS } from '../data/clinicData';
import { ReviewItem } from '../types/appointment';

export const PatientTestimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active card index
    const approxCardWidth = 560;
    const idx = Math.round(scrollLeft / approxCardWidth);
    setActiveIndex(Math.min(CLINIC_REVIEWS.length - 1, Math.max(0, idx)));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -560 : 560;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToReview = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = idx * 560;
    scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
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

        {/* Horizontal Scrolling Cards with Keyboard Navigation */}
        <div
          className="testimonials-track"
          ref={scrollContainerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Patient reviews carousel. Use left and right arrow keys to navigate."
        >
          {CLINIC_REVIEWS.map((review: ReviewItem) => (
            <article key={review.id} className="testimonial-card">
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

        {/* Minimalist Interactive Progress / Slide Dots */}
        <div className="testimonials-dots-tracker" role="tablist" aria-label="Review pagination">
          {CLINIC_REVIEWS.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to review ${idx + 1}`}
              className={`testimonial-dot ${activeIndex === idx ? 'is-active' : ''}`}
              onClick={() => scrollToReview(idx)}
            />
          ))}
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
