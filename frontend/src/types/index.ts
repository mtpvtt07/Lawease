// src/types/index.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
}

export interface SavedSolution {
  id: string;
  title: string;
  category: 'Property' | 'Family' | 'Criminal' | 'Civil';
  snippet: string;
  url: string;
}

export type ConsultationStatus = 'Completed' | 'Scheduled' | 'Cancelled';

export interface Consultation {
  id: string;
  lawyerName: string;
  lawyerAvatarUrl: string;
  date: string; // Use ISO string for dates
  status: ConsultationStatus;
}