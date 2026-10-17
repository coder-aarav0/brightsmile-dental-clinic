import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Clock,
  User,
  Phone,
  NotePencil,
  CheckCircle,
  WarningCircle,
  Copy,
  Check,
  WhatsappLogo,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react';
import { CLINIC_SERVICES, CLINIC_SLOTS, DOCTOR_DATA } from '../data/clinicData';
import { ClinicalShift } from '../types/appointment';

export const BookingSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CLINIC_SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedShift, setSelectedShift] = useState<ClinicalShift>('morning');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('BST-492104');
  const [validationError, setValidationError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const selectedService = CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];
  const morningSlots = CLINIC_SLOTS.filter((s) => s.shift === 'morning');
  const eveningSlots = CLINIC_SLOTS.filter((s) => s.shift === 'evening');

  // Completely EMOJI-FREE, strictly professional WhatsApp message
  const formattedMessage = `*APPOINTMENT BOOKING REQUEST - BRIGHTSMILE CLINIC*
---------------------------------------
Booking Reference: ${bookingRef}
Patient Name: ${patientName.trim() ? patientName.trim() : 'Patient Name'}
Contact Phone: +91 ${phoneNumber.trim() ? phoneNumber.trim() : 'XXXXXXXXXX'}
Requested Treatment: ${selectedService.name}
Preferred Date: ${selectedDate || 'Selected Date'}
Preferred Time: ${selectedSlot} (${selectedShift === 'morning' ? 'Morning Shift' : 'Evening Shift'})
Clinical Notes: ${patientNotes.trim() ? patientNotes.trim() : 'General consultation and evaluation'}
---------------------------------------
Please confirm chairside slot availability. Thank you!`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setValidationError('Please enter patient full name.');
      return;
    }
    if (phoneNumber.trim().length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setValidationError('');

    const newRef = `BST-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(newRef);

    const message = `*APPOINTMENT BOOKING REQUEST - BRIGHTSMILE CLINIC*\n---------------------------------------\nBooking Reference: ${newRef}\nPatient Name: ${patientName.trim()}\nContact Phone: +91 ${phoneNumber.trim()}\nRequested Treatment: ${selectedService.name}\nPreferred Date: ${selectedDate}\nPreferred Time: ${selectedSlot} (${selectedShift === 'morning' ? 'Morning Shift' : 'Evening Shift'})\nClinical Notes: ${patientNotes.trim() ? patientNotes.trim() : 'General consultation'}\n---------------------------------------\nPlease confirm chairside slot availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${DOCTOR_DATA.whatsappPhone}&text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setIsDispatched(true);
  };

  return (
    <section id="booking-station" className="booking-station-section" aria-label="Appointment Booking Station">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">
            <WhatsappLogo size={16} weight="fill" />
            <span>Direct WhatsApp Scheduling</span>
          </div>
          <h2 className="section-title">Schedule Your Consultation In Under 60 Seconds</h2>
          <p className="section-subtitle">
            No phone queues or automated callbacks. Select your preferred clinical service and time slot, and our front desk receives your formatted request directly on WhatsApp.
          </p>
        </div>

        <div className="booking-station-grid">
          {/* Left Form Card */}
          <div className="station-form-card">
            <form onSubmit={handleDispatch}>
              {validationError && (
                <div className="validation-error-banner" role="alert" style={{ marginBottom: 18 }}>
                  <WarningCircle size={18} weight="bold" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Select Service */}
              <div className="input-group">
                <label className="form-label" htmlFor="station-service">
                  1. Select Clinical Service
                </label>
                <div className="service-select-grid">
                  {CLINIC_SERVICES.slice(0, 6).map((service) => (
                    <div
                      key={service.id}
                      className={`service-card-choice ${selectedServiceId === service.id ? 'selected' : ''}`}
                      onClick={() => setSelectedServiceId(service.id)}
                    >
                      <div className="service-choice-icon">
                        <Sparkle size={18} weight="duotone" />
                      </div>
                      <div>
                        <div className="service-choice-name">{service.name}</div>
                        <div className="service-choice-desc">{service.priceEstimate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Slot */}
              <div className="input-group" style={{ marginTop: 24 }}>
                <label className="form-label" htmlFor="station-date">
                  <CalendarCheck size={16} weight="duotone" style={{ display: 'inline', marginRight: 6 }} />
                  2. Select Consultation Date
                </label>
                <input
                  type="date"
                  id="station-date"
                  className="date-input"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="shift-tabs-container">
                <div className="shift-title">
                  <Clock size={16} weight="duotone" />
                  <span>Morning Shift (10:00 AM – 01:30 PM)</span>
                </div>
                <div className="slot-chips-grid">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      className={`slot-chip ${selectedSlot === slot.time && selectedShift === 'morning' ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSlot(slot.time);
                        setSelectedShift('morning');
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shift-tabs-container">
                <div className="shift-title">
                  <Clock size={16} weight="duotone" />
                  <span>Evening Shift (05:00 PM – 09:00 PM)</span>
                </div>
                <div className="slot-chips-grid">
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      className={`slot-chip ${selectedSlot === slot.time && selectedShift === 'evening' ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSlot(slot.time);
                        setSelectedShift('evening');
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Patient Information */}
              <div className="input-group" style={{ marginTop: 20 }}>
                <label className="form-label" htmlFor="station-name">
                  <User size={16} weight="duotone" style={{ display: 'inline', marginRight: 6 }} />
                  3. Patient Full Name *
                </label>
                <input
                  type="text"
                  id="station-name"
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="form-label" htmlFor="station-phone">
                  <Phone size={16} weight="duotone" style={{ display: 'inline', marginRight: 6 }} />
                  WhatsApp Mobile Number *
                </label>
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    id="station-phone"
                    className="phone-field"
                    placeholder="98765 43210"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="form-label" htmlFor="station-notes">
                  <NotePencil size={16} weight="duotone" style={{ display: 'inline', marginRight: 6 }} />
                  Symptoms / Tooth Condition (Optional)
                </label>
                <input
                  type="text"
                  id="station-notes"
                  className="form-input"
                  placeholder="e.g. Tooth sensitivity or general checkup"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-whatsapp"
                style={{ width: '100%', marginTop: 14 }}
              >
                <WhatsappLogo size={22} weight="fill" />
                <span>Send & Book on WhatsApp</span>
              </button>

              {isDispatched && (
                <div style={{ marginTop: 14, textAlign: 'center', color: '#00897b', fontWeight: 600 }}>
                  <CheckCircle size={18} weight="fill" style={{ display: 'inline', marginRight: 6 }} />
                  <span>Booking formatted & WhatsApp opened in a new tab!</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Live WhatsApp Preview Card */}
          <div className="station-preview-card">
            <div className="preview-badge">
              <WhatsappLogo size={14} weight="fill" />
              <span>Live WhatsApp Dispatch Preview</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>
              Automated Clinical Dispatch
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#90caf9', lineHeight: 1.5 }}>
              Here is the exact formatted clinical message that will be delivered directly to Dr. Manish Kumar&apos;s desk when you click submit:
            </p>

            <div className="preview-bubble">
              {formattedMessage}
            </div>

            <div style={{ marginTop: 14 }}>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="btn-navy"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.82rem',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  boxShadow: 'none',
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} weight="bold" color="#25d366" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} weight="bold" />
                    <span>Copy Message Text</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ marginTop: 24, fontSize: '0.82rem', color: '#9cb2c9', lineHeight: 1.5 }}>
              <ShieldCheck size={16} weight="duotone" style={{ display: 'inline', marginRight: 6, color: '#64b5f6' }} />
              <strong>Fast Response:</strong> Our front desk prioritizes WhatsApp inquiries. Typical confirmation response is under 15 minutes during clinical hours.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
