/* 🛡️ Strict TypeScript Types for BrightSmile Dental */

export type ClinicalShift = 'morning' | 'evening';

export type ServiceCategory = 'all' | 'cosmetic' | 'surgical' | 'preventive';

export interface DentalService {
  id: string;
  name: string;
  category: 'cosmetic' | 'surgical' | 'preventive';
  categoryLabel: string;
  duration: string;
  description: string;
  image: string;
  badge?: string;
  priceEstimate: string;
  painLevel: string;
  recoveryTime: string;
  warranty?: string;
  idealFor: string;
  features: string[];
  protocolSteps: {
    stepNumber: string;
    title: string;
    detail: string;
  }[];
}

export interface ShiftSlot {
  id: string;
  time: string;
  shift: ClinicalShift;
}

export interface AppointmentData {
  serviceId: string;
  serviceName: string;
  appointmentDate: string;
  shift: ClinicalShift;
  timeSlot: string;
  patientName: string;
  phoneNumber: string;
  notes: string;
  bookingRef: string;
}

export interface DoctorProfile {
  name: string;
  degrees: string;
  institution: string;
  regNumber: string;
  experienceYears: number;
  happyPatients: number;
  phone: string;
  whatsappPhone: string;
  email: string;
  address: string;
}

export interface ReviewItem {
  id: string;
  patientName: string;
  avatar: string;
  rating: number;
  reviewText: string;
  treatmentTag: string;
  date: string;
  roleOrLocation?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
