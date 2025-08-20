export interface Event {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: EventCategory;
  maxParticipants: number;
  currentParticipants: number;
  teamSize: {
    min: number;
    max: number;
  };
  registrationFee: number;
  prizes: Prize[];
  date: Date;
  time: {
    start: string;
    end: string;
  };
  venue: string;
  rules: string[];
  coordinators: Coordinator[];
  schedule: EventSchedule[];
  image: string;
  isRegistrationOpen: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Prize {
  position: string;
  amount: number;
  description?: string;
}

export interface Coordinator {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

export interface EventSchedule {
  id: string;
  time: string;
  activity: string;
  description?: string;
  venue?: string;
}

export interface EventFilter {
  category?: string;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy: 'name' | 'date' | 'price' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  teamId?: string;
  registrationDate: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  amount: number;
}

export interface Team {
  id: string;
  name: string;
  eventId: string;
  leaderId: string;
  leaderName: string;
  members: TeamMember[];
  maxMembers: number;
  invitations: TeamInvitation[];
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  joinedAt: Date;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  inviteeEmail: string;
  inviteeName?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date;
}
