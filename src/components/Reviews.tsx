import React from 'react';
import { Star, ChatCircleDots, SealCheck, Quotes } from '@phosphor-icons/react';
import { CLINIC_REVIEWS } from '../data/clinicData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">
            <ChatCircleDots size={15} weight="duotone" />
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="section-title">Loved By Over 10,000+ Happy Patients</h2>
          <p className="section-subtitle">
            Read authentic experiences from patients who conquered their dental fears and restored their confident smiles with Dr. Manish Kumar.
          </p>
        </div>

        <div className="reviews-grid">
          {CLINIC_REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-top-bar">
                <div className="review-card-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} weight="fill" color="#f59e0b" />
                  ))}
                </div>
                <Quotes size={24} weight="duotone" className="review-quote-icon" />
              </div>

              <p className="review-card-text">
                &ldquo;{review.reviewText}&rdquo;
              </p>

              <div className="review-card-patient">
                <img
                  src={review.avatar}
                  alt={review.patientName}
                  className="review-patient-avatar"
                  loading="lazy"
                />
                <div className="review-patient-meta">
                  <div className="review-patient-name">
                    <span>{review.patientName}</span>
                    <span title="Verified Patient" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <SealCheck size={16} weight="fill" color="#1976d2" />
                    </span>
                  </div>
                  <div className="review-treatment-tag">
                    {review.treatmentTag} &bull; {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
