
export enum SubjectType {
  THEORY = 'Theory',
  LAB = 'Lab',
}

export enum UserRole {
  ADMIN = 'admin',
  FACULTY = 'faculty',
  STUDENT = 'student',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  weeklyLoad: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  abbreviation: string;
  type: SubjectType;
  year: number;
  semester: number;
  section: string; // 'A', 'B', or '' for common
  periodsPerWeek: number;
  assignedFacultyId: string;
}

export interface Room {
  id: string;
  name: string;
  type: SubjectType;
  capacity: number;
}

export interface Section {
  id: string;
  year: number;
  semester: number;
  name: string;
  classTeacherId: string;
  defaultRoomId: string;
  wefDate: string; // "with effect from" date
}

export interface StudentGroup {
    id: string;
    sectionId: string;
    year: number;
    semester: number;
    strength: number;
    rollRange: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  period: number;
  subjectId: string;
  facultyId: string;
  roomId: string;
  sectionId: string;
  batch?: string; // e.g., 'A', 'B' for labs
}

export interface ChangeLog {
  id: string;
  timestamp: string;
  user: string;
  description: string;
}

export interface AppState {
  users: User[];
  faculty: Faculty[];
  subjects: Subject[];
  rooms: Room[];
  sections: Section[];
  students: StudentGroup[];
  timetable: TimetableEntry[];
  logs: ChangeLog[];
  isPublished: boolean;
}
