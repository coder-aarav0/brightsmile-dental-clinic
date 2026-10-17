import React from 'react';
import { CalendarCheck } from '@phosphor-icons/react';

interface BookingBannerProps {
  onOpenBooking: () => void;
}

export const BookingBanner: React.FC<BookingBannerProps> = ({ onOpenBooking }) => {
  return (
    <section id="book-visit" className="booking-banner-section" aria-label="Book Your Visit at BrightSmile">
      <div className="container">
        <div className="booking-banner-content">
          {/* Main Headline */}
          <h2 className="booking-banner-headline">Book Your Visit at BrightSmile</h2>

          {/* Subtitle */}
          <p className="booking-banner-subtitle">
            Healthy smiles start with timely care.
            <br />
            Schedule your appointment today and let our team take care of the rest.
          </p>

          {/* Reassurance & Next Slot Availability Micro-Pill */}
          <div className="booking-reassurance-pill">
            <span className="reassurance-pulse-beacon" aria-hidden="true" />
            <span>Next Available Slot: Tomorrow, 11:30 AM &bull; Zero Waiting Guarantee</span>
          </div>

          {/* Primary CTA Button */}
          <div className="booking-banner-action">
            <button
              type="button"
              className="booking-banner-cta-btn"
              onClick={onOpenBooking}
              aria-label="Book an Appointment with BrightSmile"
            >
              <CalendarCheck size={20} weight="bold" className="cta-calendar-icon" aria-hidden="true" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingBanner;
