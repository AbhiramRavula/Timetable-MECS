import type { Course, Professor, Room, ScheduleEntry, ChangeLogEntry } from './types';

export const courses: Course[] = [
  { id: 'C01', name: 'Introduction to Computer Science', code: 'CS101', credits: 3 },
  { id: 'C02', name: 'Advanced Algorithms', code: 'CS301', credits: 4 },
  { id: 'C03', name: 'Database Management Systems', code: 'CS305', credits: 4 },
  { id: 'C04', name: 'Calculus I', code: 'MATH101', credits: 4 },
  { id: 'C05', name: 'Linear Algebra', code: 'MATH203', credits: 3 },
  { id: 'C06', name: 'General Physics', code: 'PHY101', credits: 4 },
];

export const professors: Professor[] = [
  { id: 'P01', name: 'Dr. Evelyn Reed', department: 'Computer Science' },
  { id: 'P02', name: 'Dr. Samuel Chen', department: 'Computer Science' },
  { id: 'P03', name: 'Dr. Maria Garcia', department: 'Mathematics' },
  { id: 'P04', name: 'Dr. Ben Carter', department: 'Physics' },
];

export const rooms: Room[] = [
  { id: 'R01', name: 'Hall A', capacity: 100 },
  { id: 'R02', name: 'Hall B', capacity: 120 },
  { id: 'R03', name: 'Lab 1', capacity: 30 },
  { id: 'R04', name: 'Lab 2', capacity: 30 },
  { id: 'R05', name: 'Room 101', capacity: 50 },
  { id: 'R06', name: 'Room 102', capacity: 50 },
];

export const schedule: ScheduleEntry[] = [
  {
    id: 'S01',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    course: courses[0],
    professor: professors[0],
    room: rooms[0],
  },
  {
    id: 'S02',
    day: 'Monday',
    startTime: '11:00',
    endTime: '12:30',
    course: courses[3],
    professor: professors[2],
    room: rooms[1],
  },
  {
    id: 'S03',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '11:30',
    course: courses[1],
    professor: professors[1],
    room: rooms[4],
  },
  {
    id: 'S04',
    day: 'Tuesday',
    startTime: '13:00',
    endTime: '14:30',
    course: courses[5],
    professor: professors[3],
    room: rooms[2],
  },
  {
    id: 'S05',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:30',
    course: courses[2],
    professor: professors[1],
    room: rooms[5],
  },
  {
    id: 'S06',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '15:30',
    course: courses[0],
    professor: professors[0],
    room: rooms[0],
  },
  {
    id: 'S07',
    day: 'Thursday',
    startTime: '11:00',
    endTime: '12:30',
    course: courses[4],
    professor: professors[2],
    room: rooms[4],
  },
  {
    id: 'S08',
    day: 'Friday',
    startTime: '10:00',
    endTime: '11:30',
    course: courses[1],
    professor: professors[1],
    room: rooms[3],
  },
];

export const changeLogs: ChangeLogEntry[] = [
    { id: 'L01', timestamp: new Date('2023-10-26T10:00:00Z'), user: 'Admin', action: 'GENERATE', details: 'Initial timetable generated for Fall 2023.' },
    { id: 'L02', timestamp: new Date('2023-10-26T14:30:00Z'), user: 'Admin', action: 'UPDATE', details: 'Manually moved CS101 from Monday 9am to Wednesday 2pm.' },
    { id: 'L03', timestamp: new Date('2023-10-27T09:00:00Z'), user: 'Admin', action: 'PUBLISH', details: 'Fall 2023 timetable published.' },
];
