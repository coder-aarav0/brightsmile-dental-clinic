import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CheckCircle,
  WhatsappLogo,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  WarningCircle,
  ArrowRight,
  ArrowLeft,
  Sparkle,
  ShieldCheck,
  Scan,
  FirstAid,
  Check,
  CalendarBlank,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';
import { CLINIC_SERVICES, CLINIC_SLOTS, DOCTOR_DATA } from '../data/clinicData';
import { ClinicalShift } from '../types/appointment';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || CLINIC_SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());
  const [selectedShift, setSelectedShift] = useState<ClinicalShift>('morning');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Close on Escape & lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Generate the next 3 days for quick date selection
  const quickDates = useMemo(() => {
    const dates = [];
    for (let i = 1; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const iso = `${yyyy}-${mm}-${dd}`;
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isTomorrow = i === 1;
      dates.push({ iso, weekday, monthDay, isTomorrow });
    }
    return dates;
  }, []);

  // Prevent navigating to previous months earlier than current month
  const isPrevMonthDisabled = useMemo(() => {
    const today = new Date();
    return (
      calendarViewDate.getFullYear() === today.getFullYear() &&
      calendarViewDate.getMonth() <= today.getMonth()
    );
  }, [calendarViewDate]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrevMonthDisabled) return;
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
  };

  const monthTitle = useMemo(() => {
    return calendarViewDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [calendarViewDate]);

  const calendarDays = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    // Empty padding slots
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: 0, iso: '', isDisabled: true, isPadding: true, isToday: false, isSelected: false });
    }

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      d.setHours(0, 0, 0, 0);
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const iso = `${year}-${mm}-${dd}`;
      const isDisabled = d.getTime() < today.getTime();
      const isToday = d.getTime() === today.getTime();
      const isSelected = selectedDate === iso;

      days.push({
        dayNumber: day,
        iso,
        isDisabled,
        isToday,
        isSelected,
        isPadding: false,
      });
    }

    return days;
  }, [calendarViewDate, selectedDate]);

  // Default to tomorrow's date
  useEffect(() => {
    if (quickDates.length > 0 && !selectedDate) {
      setSelectedDate(quickDates[0].iso);
    }
  }, [quickDates, selectedDate]);

  // Update initial service when prop changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // When calendar opens, sync view date to currently selected date if available
  useEffect(() => {
    if (isCalendarOpen && selectedDate) {
      const parts = selectedDate.split('-').map(Number);
      if (parts.length === 3 && parts[0] && parts[1]) {
        setCalendarViewDate(new Date(parts[0], parts[1] - 1, 1));
      }
    }
  }, [isCalendarOpen, selectedDate]);

  // Custom date representation for ribbon button
  const customDateObj = useMemo(() => {
    if (!selectedDate || !isCustomDate) return null;
    try {
      const parts = selectedDate.split('-').map(Number);
      if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return {
          weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
          monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };
      }
      return null;
    } catch {
      return null;
    }
  }, [selectedDate, isCustomDate]);

  if (!isOpen) return null;

  const selectedService = CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];
  const morningSlots = CLINIC_SLOTS.filter((s) => s.shift === 'morning');
  const eveningSlots = CLINIC_SLOTS.filter((s) => s.shift === 'evening');

  // Human-readable formatted date
  const formattedDateString = (() => {
    if (!selectedDate) return 'Tomorrow';
    const matchQuick = quickDates.find((q) => q.iso === selectedDate);
    if (matchQuick && !isCustomDate) {
      return matchQuick.isTomorrow ? `Tomorrow, ${matchQuick.monthDay}` : `${matchQuick.weekday}, ${matchQuick.monthDay}`;
    }
    try {
      const parts = selectedDate.split('-').map(Number);
      if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }
      const d = new Date(selectedDate);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return selectedDate;
    }
  })();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'teeth-whitening':
        return <Sparkle size={20} weight="duotone" />;
      case 'dental-implants':
        return <ShieldCheck size={20} weight="duotone" />;
      case 'braces-invisalign':
        return <Scan size={20} weight="duotone" />;
      case 'root-canal-treatment':
        return <FirstAid size={20} weight="duotone" />;
      case 'general-checkups-cleaning':
        return <CheckCircle size={20} weight="duotone" />;
      case 'emergency-dental-relief':
        return <WarningCircle size={20} weight="duotone" />;
      default:
        return <Sparkle size={20} weight="duotone" />;
    }
  };

  const generateWhatsAppMessage = (refId: string) => {
    const message = `*APPOINTMENT BOOKING REQUEST - BRIGHTSMILE CLINIC*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nBooking Reference: ${refId}\nPatient Name: ${patientName.trim()}\nWhatsApp Contact: +91 ${phoneNumber.trim()}\nSelected Service: ${selectedService.name}\nConsultation Date: ${selectedDate} (${formattedDateString})\nTime Slot: ${selectedSlot} (${selectedShift === 'morning' ? 'Morning Shift' : 'Evening Shift'})\nClinical Notes: ${patientNotes.trim() ? patientNotes.trim() : 'Routine dental checkup & consultation'}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nAttn: Dr. Manish Kumar (BDS, MDS - Oral & Dental Surgeon)\nPlease confirm appointment availability and send clinic address instructions. Thank you.`;

    const encoded = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${DOCTOR_DATA.whatsappPhone}&text=${encoded}`;
  };

  const handleDispatchWhatsApp = (e: React.FormEvent) => {
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
    const url = generateWhatsAppMessage(newRef);
    setWhatsappUrl(url);

    // Auto-launch WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');

    // Move to Step 4: Confirmation screen
    setCurrentStep(4);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-eyebrow-row">
              <span className="modal-eyebrow-pill">Direct Clinic Desk</span>
              <span className="modal-live-slot-indicator">
                <span className="modal-live-dot" aria-hidden="true" />
                Slots Open
              </span>
            </div>
            <h3 id="modal-booking-title" className="modal-title">
              {currentStep === 4 ? 'Appointment Request Created!' : 'Book Dental Consultation'}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* 3-Step Breadcrumb Progress Bar */}
        {currentStep < 4 && (
          <div className="modal-breadcrumb-bar">
            <button
              type="button"
              className={`breadcrumb-step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <span className="step-num">1</span>
              <span className="step-text">Treatment</span>
            </button>
            <span className="breadcrumb-divider">/</span>
            <button
              type="button"
              className={`breadcrumb-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
              onClick={() => setCurrentStep(2)}
            >
              <span className="step-num">2</span>
              <span className="step-text">Schedule</span>
            </button>
            <span className="breadcrumb-divider">/</span>
            <button
              type="button"
              className={`breadcrumb-step ${currentStep === 3 ? 'active' : ''}`}
              onClick={() => {
                if (currentStep > 3) setCurrentStep(3);
              }}
            >
              <span className="step-num">3</span>
              <span className="step-text">Details</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body">
          {/* STEP 1: Symmetrical 3x2 Service Cards Grid */}
          {currentStep === 1 && (
            <div className="modal-step-container">
              <div className="step-section-heading">
                <h4>Select Clinical Treatment</h4>
                <p>Choose the dental procedure you would like to schedule with Dr. Manish.</p>
              </div>

              <div className="service-select-grid">
                {CLINIC_SERVICES.slice(0, 6).map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      className={`service-card-choice ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedServiceId(service.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedServiceId(service.id);
                        }
                      }}
                    >
                      {/* Top Row: Icon + Radio Ring */}
                      <div className="service-card-top-row">
                        <div className="service-choice-icon">
                          {getServiceIcon(service.id)}
                        </div>
                        <div className={`service-select-indicator ${isSelected ? 'active' : ''}`} aria-hidden="true">
                          {isSelected && <Check size={11} weight="bold" />}
                        </div>
                      </div>

                      {/* Middle: Name + Category */}
                      <div className="service-card-content">
                        <div className="service-choice-name">{service.name}</div>
                        <div className="service-choice-brief">{service.categoryLabel}</div>
                      </div>

                      {/* Bottom Meta Row: Duration Pill + Price */}
                      <div className="service-card-meta-row">
                        <span className="service-meta-pill">
                          <Clock size={11} weight="bold" />
                          <span>{service.duration}</span>
                        </span>
                        <span className="service-meta-price">{service.priceEstimate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Smart Date Quick Ribbon & Tactile Shift Slots */}
          {currentStep === 2 && (
            <div className="modal-step-container">
              <div className="step-section-heading">
                <h4>Select Consultation Date &amp; Slot</h4>
                <p>Choose a convenient time for your clinical visit at our clinic.</p>
              </div>

              {/* 1-Click Smart Quick Date Ribbon */}
              <div className="quick-date-group">
                <label className="form-label">
                  <Calendar size={15} weight="bold" />
                  <span>Choose Date</span>
                </label>
                <div className="quick-date-ribbon">
                  {quickDates.map((q) => {
                    const isSelected = selectedDate === q.iso && !isCustomDate;
                    return (
                      <button
                        key={q.iso}
                        type="button"
                        className={`date-pill-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedDate(q.iso);
                          setIsCustomDate(false);
                          setIsCalendarOpen(false);
                        }}
                      >
                        {q.isTomorrow && <span className="date-avail-dot" aria-hidden="true" />}
                        <span className="date-weekday">{q.isTomorrow ? 'Tomorrow' : q.weekday}</span>
                        <span className="date-daynum">{q.monthDay}</span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className={`date-pill-btn custom-picker-btn ${isCustomDate || isCalendarOpen ? 'selected' : ''}`}
                    onClick={() => {
                      setIsCustomDate(true);
                      setIsCalendarOpen((prev) => !prev);
                    }}
                    aria-expanded={isCalendarOpen}
                    aria-label="Select custom appointment date from calendar"
                  >
                    {customDateObj ? (
                      <>
                        <span className="date-weekday">{customDateObj.weekday}</span>
                        <span className="date-daynum">{customDateObj.monthDay}</span>
                      </>
                    ) : (
                      <>
                        <CalendarBlank size={16} weight="bold" />
                        <span className="date-weekday">{isCalendarOpen ? 'Selecting' : 'Other Date'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Custom Calendar Popover Dialog */}
                {isCalendarOpen && (
                  <div className="custom-calendar-popover" role="dialog" aria-label="Clinical Appointment Calendar">
                    <div className="calendar-header-nav">
                      <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handlePrevMonth}
                        disabled={isPrevMonthDisabled}
                        aria-label="Previous month"
                      >
                        <CaretLeft size={16} weight="bold" />
                      </button>
                      <span className="cal-month-title">{monthTitle}</span>
                      <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handleNextMonth}
                        aria-label="Next month"
                      >
                        <CaretRight size={16} weight="bold" />
                      </button>
                    </div>

                    <div className="cal-weekdays-row" aria-hidden="true">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>

                    <div className="cal-days-grid">
                      {calendarDays.map((item, idx) =>
                        item.isPadding ? (
                          <span key={`pad-${idx}`} className="cal-day-cell pad" aria-hidden="true" />
                        ) : (
                          <button
                            key={item.iso}
                            type="button"
                            className={`cal-day-cell ${item.isSelected ? 'selected' : ''} ${item.isToday ? 'today' : ''} ${item.isDisabled ? 'disabled' : ''}`}
                            disabled={item.isDisabled}
                            onClick={() => {
                              setSelectedDate(item.iso);
                              setIsCustomDate(true);
                              setIsCalendarOpen(false);
                            }}
                            aria-label={`Select date ${item.iso}`}
                          >
                            <span className="cal-day-val">{item.dayNumber}</span>
                            {item.isToday && <span className="today-micro-dot" aria-hidden="true" />}
                          </button>
                        )
                      )}
                    </div>

                    <div className="cal-footer-row">
                      <span className="cal-tip-text">Dr. Manish available Mon &ndash; Sun</span>
                      <button
                        type="button"
                        className="cal-close-btn"
                        onClick={() => setIsCalendarOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* Micro Confirmation Bar when custom date is picked & calendar is collapsed */}
                {isCustomDate && !isCalendarOpen && customDateObj && (
                  <div className="custom-date-selected-bar">
                    <div className="custom-date-badge-info">
                      <Calendar size={14} weight="bold" className="custom-date-icon" />
                      <span>Selected Date: <strong>{formattedDateString}</strong></span>
                    </div>
                    <button
                      type="button"
                      className="custom-date-change-link"
                      onClick={() => setIsCalendarOpen(true)}
                    >
                      Change Date
                    </button>
                  </div>
                )}
              </div>

              {/* Morning Shift Slots */}
              <div className="shift-block">
                <div className="shift-header-row">
                  <span className="shift-badge morning">Morning Shift</span>
                  <span className="shift-hours">10:00 AM &ndash; 01:30 PM</span>
                </div>
                <div className="slot-chips-grid">
                  {morningSlots.map((slot) => {
                    const isSelected = selectedSlot === slot.time && selectedShift === 'morning';
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        className={`slot-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedSlot(slot.time);
                          setSelectedShift('morning');
                        }}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evening Shift Slots */}
              <div className="shift-block">
                <div className="shift-header-row">
                  <span className="shift-badge evening">Evening Shift</span>
                  <span className="shift-hours">05:00 PM &ndash; 09:00 PM</span>
                </div>
                <div className="slot-chips-grid">
                  {eveningSlots.map((slot) => {
                    const isSelected = selectedSlot === slot.time && selectedShift === 'evening';
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        className={`slot-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedSlot(slot.time);
                          setSelectedShift('evening');
                        }}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {currentStep === 3 && (
            <form onSubmit={handleDispatchWhatsApp} className="modal-step-container">
              <div className="step-section-heading">
                <h4>Patient Information</h4>
                <p>Provide contact details for direct WhatsApp dispatch &amp; priority scheduling.</p>
              </div>

              {validationError && (
                <div className="validation-error-banner" role="alert">
                  <WarningCircle size={16} weight="bold" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="input-group">
                <label className="form-label" htmlFor="patient-name">
                  <User size={15} weight="bold" />
                  <span>Patient Full Name *</span>
                </label>
                <input
                  type="text"
                  id="patient-name"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="form-label" htmlFor="patient-phone">
                  <Phone size={15} weight="bold" />
                  <span>WhatsApp Mobile Number *</span>
                </label>
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    id="patient-phone"
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
                <label className="form-label" htmlFor="patient-notes">
                  <FileText size={15} weight="bold" />
                  <span>Symptoms or Consultation Notes (Optional)</span>
                </label>
                <input
                  type="text"
                  id="patient-notes"
                  className="form-input"
                  placeholder="e.g. Mild sensitivity when drinking cold water"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                />
              </div>

              {/* Minimalist WhatsApp Trust Badge */}
              <div className="whatsapp-trust-capsule">
                <WhatsappLogo size={20} weight="fill" className="whatsapp-capsule-icon" />
                <div className="whatsapp-capsule-text">
                  <strong>Instant WhatsApp Dispatch:</strong> Direct triage with Dr. Manish Kumar&apos;s clinic desk for immediate priority confirmation.
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation & Fallback Screen */}
          {currentStep === 4 && (
            <div className="confirmation-container">
              <div className="confirm-badge-icon">
                <CheckCircle size={40} weight="fill" color="#16a34a" />
              </div>
              <h4 className="confirm-title">Consultation Slip Formatted</h4>
              <p className="confirm-desc">
                WhatsApp has been launched with your pre-filled consultation request. Click below if WhatsApp did not open automatically.
              </p>

              <div className="booking-summary-card">
                <div className="summary-row">
                  <span className="summary-label">Booking Reference:</span>
                  <span className="summary-ref-code">{bookingRef}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Patient Name:</span>
                  <span className="summary-val">{patientName}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Service:</span>
                  <span className="summary-val">{selectedService.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Date &amp; Time:</span>
                  <span className="summary-val">{formattedDateString} at {selectedSlot}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Doctor Desk:</span>
                  <span className="summary-val">Dr. Manish Kumar (+91 98765 43210)</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-whatsapp-confirm"
                onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
              >
                <WhatsappLogo size={20} weight="fill" />
                <span>Open WhatsApp to Confirm Booking</span>
              </button>

              <button
                type="button"
                className="btn-modal-done"
                onClick={onClose}
              >
                Done / Close Window
              </button>
            </div>
          )}

          {/* Persistent Live Booking Summary Anchor (Steps 1, 2, 3) */}
          {currentStep < 4 && (
            <div className="modal-live-summary-bar">
              <div className="summary-bar-left">
                <span className="summary-live-dot" aria-hidden="true" />
                <span className="summary-service-name">{selectedService.name}</span>
                <span className="summary-sep">&bull;</span>
                <span className="summary-slot-name">{formattedDateString}, {selectedSlot}</span>
              </div>
              <span className="summary-doctor-name">Dr. Manish</span>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {currentStep < 4 && (
          <div className="modal-footer">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn-modal-back"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                <ArrowLeft size={15} weight="bold" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                className="btn-modal-primary"
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                <span>Continue</span>
                <ArrowRight size={15} weight="bold" />
              </button>
            ) : (
              <button
                type="button"
                className="btn-modal-whatsapp"
                onClick={handleDispatchWhatsApp}
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Book &amp; Open WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
