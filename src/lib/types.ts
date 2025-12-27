export type Course = {
  id: string;
  name: string;
  code: string;
  credits: number;
};

export type Professor = {
  id: string;
  name: string;
  department: string;
};

export type Room = {
  id: string;
  name: string;
  capacity: number;
};

export type ScheduleEntry = {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  course: Course;
  professor: Professor;
  room: Room;
};

export type ChangeLogEntry = {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  details: string;
};
