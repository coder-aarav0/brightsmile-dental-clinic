import React, { useState } from 'react';
import { Sparkle } from '@phosphor-icons/react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { DentalService } from '../types/appointment';

interface ServicesBentoProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenBooking }) => {
  // 'all' or specific service.id
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filtered services: if 'all', show all 6 services; otherwise show the selected service
  const displayedServices: DentalService[] =
    activeFilter === 'all'
      ? CLINIC_SERVICES
      : CLINIC_SERVICES.filter((s) => s.id === activeFilter);

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section id="services" className="services-editorial-section" aria-label="Services Offered">
      <div className="services-editorial-container">
        {/* Eyebrow */}
        <div className="services-editorial-eyebrow">
          <Sparkle size={13} weight="fill" className="eyebrow-sparkle" aria-hidden="true" />
          <span>Services Offered</span>
        </div>

        {/* Editorial Serif Heading */}
        <h2 className="services-editorial-heading">
          Comprehensive Dental Care
          <span className="services-heading-line">For The Whole Family</span>
        </h2>

        {/* Filter Pills Cluster */}
        <div className="services-filter-cluster" role="tablist" aria-label="Filter Services">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`service-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All Services
          </button>
          {CLINIC_SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === service.id}
              className={`service-filter-pill ${activeFilter === service.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Stack of Service Rows (Text Card on Left + Real Image on Right) */}
        <div className="services-editorial-list">
          {displayedServices.map((service) => (
            <article
              key={service.id}
              id={`service-row-${service.id}`}
              className="service-editorial-row"
            >
              {/* Left Column: Content Card */}
              <div className="service-editorial-text-card">
                <div className="service-text-top">
                  <h3 className="service-editorial-card-title">{service.name}</h3>
                  <p className="service-editorial-card-desc">{service.description}</p>
                </div>

                <div className="service-text-bottom">
                  <button
                    type="button"
                    className="service-editorial-book-btn"
                    onClick={() => onOpenBooking(service.id)}
                    aria-label={`Book Appointment for ${service.name}`}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Right Column: Media Card with subtle corner sparkle */}
              <div className="service-editorial-media-card">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-editorial-photo"
                  loading="lazy"
                />
                <div className="service-photo-sparkle" aria-hidden="true">
                  <Sparkle size={18} weight="fill" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
