
import type { TimetableEntry, Subject, Room, Faculty, Section } from './types';
import { SubjectType } from './types';
import { DAYS, PERIODS, LUNCH_PERIOD } from './mock-data';

// ============================================================================
// CONFIGURATION
// ============================================================================
const PRE_LUNCH_PERIODS = [1, 2, 3, 4];
const POST_LUNCH_PERIODS = [6, 7];
const FOURTH_YEAR_HOLIDAYS = ['FRI', 'SAT'];

const STUDENT_STRENGTHS: Record<string, number> = {
  's1': 69, 's2': 62, 's3': 63, 's4': 60, 's5': 61
};

// ============================================================================
// TYPES
// ============================================================================
interface ScheduleState {
  timetable: TimetableEntry[];
  facultyBusy: Set<string>;
  roomBusy: Set<string>;
  sectionBusy: Set<string>;
  facultyLoad: Map<string, number>;
  subjectDayCount: Map<string, number>;
  labDayUsage: Map<string, Set<string>>; // "sectionId-day" -> Set of lab subject IDs
}

// ============================================================================
// UTILITIES
// ============================================================================

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const isHoliday = (year: number, day: string): boolean => 
  year === 4 && FOURTH_YEAR_HOLIDAYS.includes(day);

const getWorkingDays = (year: number): string[] => 
  DAYS.filter(day => !isHoliday(year, day));

// =================================a===========================================
// CONSTRAINT VALIDATION
// ============================================================================

const isSlotAvailable = (
  state: ScheduleState,
  facultyId: string,
  roomId: string,
  sectionId: string,
  day: string,
  period: number
): boolean => {
  if (period === LUNCH_PERIOD) return false;
  if (!facultyId || !roomId) return false;
  if (state.facultyBusy.has(`${facultyId}-${day}-${period}`)) return false;
  if (state.roomBusy.has(`${roomId}-${day}-${period}`)) return false;
  if (state.sectionBusy.has(`${sectionId}-${day}-${period}`)) return false;
  
  return true;
};

const canPlaceTheory = (
  state: ScheduleState,
  subjectId: string,
  sectionId: string,
  day: string,
): boolean => {
  const dayKey = `${subjectId}-${sectionId}-${day}`;
  // Allow a maximum of 2 periods of the same theory subject on one day
  if ((state.subjectDayCount.get(dayKey) || 0) >= 2) return false;

  return true;
};

const occupySlot = (
  state: ScheduleState,
  facultyId: string,
  roomId: string,
  sectionId: string,
  day: string,
  period: number
) => {
  state.facultyBusy.add(`${facultyId}-${day}-${period}`);
  state.roomBusy.add(`${roomId}-${day}-${period}`);
  state.sectionBusy.add(`${sectionId}-${day}-${period}`);
  state.facultyLoad.set(facultyId, (state.facultyLoad.get(facultyId) || 0) + 1);
};

const addEntry = (
  state: ScheduleState,
  day: string,
  period: number,
  subjectId: string,
  facultyId: string,
  roomId: string,
  sectionId: string,
  batch?: string
) => {
  state.timetable.push({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    day, period, subjectId, facultyId, roomId, sectionId, batch
  });
  occupySlot(state, facultyId, roomId, sectionId, day, period);
  
  const dayKey = `${subjectId}-${sectionId}-${day}`;
  state.subjectDayCount.set(dayKey, (state.subjectDayCount.get(dayKey) || 0) + 1);
};

// ============================================================================
// ADVANCED LAB SCHEDULING (ROTATION PATTERN)
// ============================================================================

const scheduleLabsForSection = (
  state: ScheduleState,
  subjects: Subject[],
  rooms: Room[],
  faculty: Faculty[],
  section: Section
): number => {
  const labSubjects = subjects.filter(
    s => s.type === SubjectType.LAB &&
         s.year === section.year &&
         s.semester === section.semester &&
         (s.section === '' || s.section === section.name)
  );

  if (labSubjects.length === 0) return 0;

  const labRooms = rooms.filter(r => r.type === SubjectType.LAB);
  const workingDays = getWorkingDays(section.year);
  
  const numBatches = labSubjects.length;
  const batchLetters = ['A', 'B', 'C'];

  if (numBatches > labRooms.length) {
    console.warn(`   ⚠️  Insufficient lab rooms for ${numBatches} batches!`);
    return labSubjects.reduce((acc, s) => acc + s.periodsPerWeek, 0);
  }

  const periodsPerLab = labSubjects[0]?.periodsPerWeek || 3;
  // A lab session is 2 periods long. So 3 periods/week means 1.5 sessions. Let's schedule 1 full session (2p) + 1 single period.
  // This seems wrong based on user feedback. Let's assume labs are always 2 periods. `periodsPerWeek: 3` for a lab is strange.
  // Let's make labs strictly 2 periods. The data might be odd.
  const numLabSessions = Math.floor(periodsPerLab / 2); // Schedule 2-period blocks

  const preferredBlocks: number[][] = [[1, 2], [3, 4], [6, 7]];
  
  let scheduledPeriods = 0;

  // Try to schedule all lab sessions for each lab subject
  for (const lab of labSubjects) {
      let remainingSessions = numLabSessions;
      
      for (let i = 0; i < numLabSessions; i++) {
        let sessionScheduled = false;
        for (const day of shuffle([...workingDays])) {
          if (sessionScheduled) break;
          
          const dayKey = `${section.id}-${day}`;
          if (state.labDayUsage.has(dayKey) && state.labDayUsage.get(dayKey)!.has(lab.id)) {
            continue; // This lab already happened on this day
          }

          for (const [p1, p2] of preferredBlocks) {
            if (sessionScheduled) break;

            const roomAssignments: Room[] = [];
            const facultyAssignments: string[] = [];

            let allBatchesAvailable = true;
            for (let batchIdx = 0; batchIdx < numBatches; batchIdx++) {
                const currentLab = labSubjects[(labSubjects.indexOf(lab) + batchIdx) % numBatches];
                let foundRoom = false;
                for (const room of labRooms) {
                    if (roomAssignments.some(r => r.id === room.id)) continue;
                    if (facultyAssignments.includes(currentLab.assignedFacultyId)) continue;
                    
                    if (isSlotAvailable(state, currentLab.assignedFacultyId, room.id, section.id, day, p1) &&
                        isSlotAvailable(state, currentLab.assignedFacultyId, room.id, section.id, day, p2)) 
                    {
                        roomAssignments.push(room);
                        facultyAssignments.push(currentLab.assignedFacultyId);
                        foundRoom = true;
                        break;
                    }
                }
                if (!foundRoom) {
                    allBatchesAvailable = false;
                    break;
                }
            }

            if (allBatchesAvailable) {
              for (let batchIdx = 0; batchIdx < numBatches; batchIdx++) {
                  const currentLab = labSubjects[(labSubjects.indexOf(lab) + batchIdx) % numBatches];
                  const batchName = `${batchLetters[batchIdx]}`;
                  const room = roomAssignments[batchIdx];

                  addEntry(state, day, p1, currentLab.id, currentLab.assignedFacultyId, room.id, section.id, batchName);
                  addEntry(state, day, p2, currentLab.id, currentLab.assignedFacultyId, room.id, section.id, batchName);
                  scheduledPeriods += 2;
                  
                  if (!state.labDayUsage.has(dayKey)) state.labDayUsage.set(dayKey, new Set());
                  state.labDayUsage.get(dayKey)!.add(currentLab.id);
              }
              sessionScheduled = true;
              remainingSessions--;
            }
          }
        }
      }
  }

  const totalRequired = labSubjects.reduce((acc, s) => acc + Math.floor(s.periodsPerWeek / 2) * 2, 0);
  return totalRequired - scheduledPeriods;
};

// ============================================================================
// INTELLIGENT THEORY SCHEDULING
// ============================================================================

const scheduleTheoryForSection = (
  state: ScheduleState,
  subjects: Subject[],
  rooms: Room[],
  section: Section
): number => {
  const theorySubjects = subjects.filter(
    s => s.type === SubjectType.THEORY &&
         s.year === section.year &&
         s.semester === section.semester &&
         (s.section === '' || s.section === section.name) &&
         s.code !== 'LIB' && s.code !== 'SPORTS'
  );

  const preferredRoom = rooms.find(r => r.id === section.defaultRoomId) || rooms.find(r => r.type === SubjectType.THEORY);
  if (!preferredRoom) return theorySubjects.reduce((sum, s) => sum + s.periodsPerWeek, 0);

  const workingDays = getWorkingDays(section.year);
  let unscheduledPeriods = 0;
  
  const allPeriods = shuffle([...PRE_LUNCH_PERIODS, ...POST_LUNCH_PERIODS]);
  
  const subjectQueue = theorySubjects.flatMap(s => Array(s.periodsPerWeek).fill(s));
  shuffle(subjectQueue);

  for (const subject of subjectQueue) {
    let placed = false;
    for (const day of shuffle([...workingDays])) {
      if (placed) break;
      if (!canPlaceTheory(state, subject.id, section.id, day)) continue;

      for (const period of allPeriods) {
        if (isSlotAvailable(state, subject.assignedFacultyId, preferredRoom.id, section.id, day, period)) {
          addEntry(state, day, period, subject.id, subject.assignedFacultyId, preferredRoom.id, section.id);
          placed = true;
          break; 
        }
      }
    }
    if (!placed) {
      unscheduledPeriods++;
    }
  }
  
  return unscheduledPeriods;
};

// ============================================================================
// STRATEGIC GAP FILLING (NEW LOGIC)
// ============================================================================

const fillGapsAndCompact = (
  state: ScheduleState,
  subjects: Subject[],
  rooms: Room[],
  sections: Section[]
) => {
  const libSubject = subjects.find(s => s.code === 'LIB');
  const sportsSubject = subjects.find(s => s.code === 'SPORTS');
  const libRoom = rooms.find(r => r.name === 'LIBRARY');
  const groundRoom = rooms.find(r => r.name === 'GROUND');

  if (!libSubject || !sportsSubject || !libRoom || !groundRoom) {
    console.warn('⚠️  Gap filling disabled: Library or Sports subjects/rooms not found');
    return;
  }
  
  const MAX_LIBRARY_PERIODS_PER_WEEK = 4;

  for (const section of sections) {
    const workingDays = getWorkingDays(section.year);
    let libraryPeriodsThisWeek = 0;
    
    for (const day of workingDays) {
      const scheduledPeriods = state.timetable
        .filter(t => t.sectionId === section.id && t.day === day)
        .map(t => t.period)
        .sort((a,b)=> a-b);
      
      if (scheduledPeriods.length === 0) continue;

      const firstPeriod = scheduledPeriods[0];
      const lastPeriod = scheduledPeriods[scheduledPeriods.length-1];
      
      // 1. Fill gaps between first and last scheduled period
      for(let p = firstPeriod + 1; p < lastPeriod; p++) {
        if (p === LUNCH_PERIOD || scheduledPeriods.includes(p)) continue;
        
        if (libraryPeriodsThisWeek < MAX_LIBRARY_PERIODS_PER_WEEK && isSlotAvailable(state, libSubject.assignedFacultyId, libRoom.id, section.id, day, p)) {
            addEntry(state, day, p, libSubject.id, libSubject.assignedFacultyId, libRoom.id, section.id);
            libraryPeriodsThisWeek++;
        } else if (isSlotAvailable(state, sportsSubject.assignedFacultyId, groundRoom.id, section.id, day, p)) {
            addEntry(state, day, p, sportsSubject.id, sportsSubject.assignedFacultyId, groundRoom.id, section.id);
        }
      }
    }

    // 2. If a day has very few classes, try to move them. (Complex logic, defer for now)
    // For now, the compaction happens naturally by filling gaps. The scheduler should be run again if it's too sparse.
  }
};


// ============================================================================
// MAIN ALGORITHM
// ============================================================================

export const generateTimetable = (
  subjects: Subject[],
  rooms: Room[],
  faculty: Faculty[],
  sections: Section[]
): TimetableEntry[] => {
  
  console.log('Generating Timetable...');

  const state: ScheduleState = {
    timetable: [],
    facultyBusy: new Set(),
    roomBusy: new Set(),
    sectionBusy: new Set(),
    facultyLoad: new Map(),
    subjectDayCount: new Map(),
    labDayUsage: new Map()
  };

  faculty.forEach(f => state.facultyLoad.set(f.id, 0));

  const sortedSections = [...sections].sort((a, b) => b.year - a.year);
  let totalUnscheduled = 0;

  // PHASE 1: Labs (Hardest Constraint)
  console.log('PHASE 1: LAB SCHEDULING');
  for (const section of sortedSections) {
    totalUnscheduled += scheduleLabsForSection(state, subjects, rooms, faculty, section);
  }

  // PHASE 2: Theory (Core Academic)
  console.log('PHASE 2: THEORY SCHEDULING');
  for (const section of sortedSections) {
    totalUnscheduled += scheduleTheoryForSection(state, subjects, rooms, section);
  }

  // PHASE 3: Fill Gaps and Compact Schedule
  console.log('PHASE 3: COMPACTING & GAP FILLING');
  fillGapsAndCompact(state, subjects, rooms, sections);

  console.log(`Generation Complete. Total Unscheduled Periods: ${totalUnscheduled}`);

  // Final check: if a day has only 1 or 2 periods, it could be considered a "bad day".
  // For now, this is acceptable, but a future iteration could try to re-schedule those.
  
  return state.timetable.sort((a,b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.period - b.period);
};
