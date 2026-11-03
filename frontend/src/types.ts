export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  PARENT = 'PARENT'
}

export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  MATHS = 'Mathematics',
  BIOLOGY = 'Biology'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  streak: number;
}

export interface Course {
  id: string;
  title: string;
  subject: Subject;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  rating: number;
}

export interface LiveClass {
  id: string;
  title: string;
  subject: Subject;
  instructor: string;
  startTime: string; // ISO string
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}
