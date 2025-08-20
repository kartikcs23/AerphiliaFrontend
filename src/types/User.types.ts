/**
 * User Types for Aerophilia 2025
 * Defines the structure for user objects throughout the application
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phoneNumber?: string;
  college?: string;
  yearOfStudy?: string;
  department?: string;
  registeredEvents: string[];
  teamInvitations: TeamInvitation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  teamName: string;
  eventId: string;
  eventName: string;
  invitedBy: string;
  inviterName: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface GoogleAuthResponse {
  user: User;
  token: string;
}
