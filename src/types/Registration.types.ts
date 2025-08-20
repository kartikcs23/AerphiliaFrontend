/**
 * Registration Types for Aerophilia 2025
 * Defines the structure for registration-related data
 */

export interface RegistrationFormData {
  eventId: string;
  participantType: 'individual' | 'team';
  teamName?: string;
  teamMembers?: TeamMemberInfo[];
  paymentMethod: 'online' | 'offline';
  agreeToTerms: boolean;
  emergencyContact: EmergencyContact;
}

export interface TeamMemberInfo {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface RegistrationProgress {
  currentStep: number;
  totalSteps: number;
  steps: RegistrationStep[];
  formData: Partial<RegistrationFormData>;
}

export interface PaymentInfo {
  amount: number;
  currency: string;
  eventName: string;
  participantName: string;
  registrationId: string;
}

export interface Receipt {
  id: string;
  registrationId: string;
  eventName: string;
  participantName: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionId: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface RegistrationValidationErrors {
  [key: string]: string;
}
