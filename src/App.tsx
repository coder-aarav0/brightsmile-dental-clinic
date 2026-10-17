import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesBento } from './components/ServicesBento';
import { PatientTestimonials } from './components/PatientTestimonials';
import { BookingBanner } from './components/BookingBanner';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Agentation } from 'agentation';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedServiceId(undefined);
  };

  return (
    <div className="brightsmile-app">
      {/* Dev-only live visual feedback annotation engine */}
      {import.meta.env.DEV && (
        <Agentation endpoint="http://localhost:4747" className="agentation-top-right" />
      )}

      <Hero
        onOpenBooking={handleOpenBooking}
        onIntroComplete={() => setIsIntroComplete(true)}
      />
      <StatsStrip />
      <AboutDoctor onOpenBooking={() => handleOpenBooking()} />
      <ServicesBento onOpenBooking={handleOpenBooking} />
      <PatientTestimonials />
      <BookingBanner onOpenBooking={() => handleOpenBooking()} />
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Global 4-Step WhatsApp Booking Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
      />

      {/* Persistent Floating 1-Click WhatsApp FAB (Revealed after intro or on scroll) */}
      <FloatingWhatsApp
        onOpenBooking={() => handleOpenBooking()}
        visible={isIntroComplete}
      />
    </div>
  );
};

export default App;
