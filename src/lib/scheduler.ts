
import type { TimetableEntry, Subject, Room, Faculty, Section } from './types';
import { SubjectType } from './types';
import { DAYS, PERIODS, LUNCH_PERIOD } from './mock-data';

// ============================================================================
// CONFIGURATION
// ============================================================================
const PRE_LUNCH_PERIODS = [1, 2, 3, 4];
const POST_LUNCH_PERIODS = [6, 7];
const FOURTH_YEAR_HOLIDAYS = ['FRI', 'SAT'];
const MAX_LIBRARY_PERIODS_PER_WEEK = 4;

// ============================================================================
// TYPES
// ============================================================================
interface ScheduleState {
  timetable: TimetableEntry[];
  facultyBusy: Set<string>; // "facultyId-day-period"
  roomBusy: Set<string>; // "roomId-day-period"
  sectionBusy: Set<string>; // "sectionId-day-period"
  facultyLoad: Map<string, number>; // facultyId -> count
  subjectDayCount: Map<string, number>; // "subjectId-sectionId-day" -> count
  labDayUsage: Map<string, Set<string>>; // "sectionId-day" -> Set of lab subject IDs
  libraryCount: Map<string, number>; // sectionId -> count
}

// =================================A===========================================
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

// ============================================================================
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
  // Allow a maximum of 2 periods of the same theory subject on one day
  const dayKey = `${subjectId}-${sectionId}-${day}`;
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
  
  if (subjectId.includes('common_lib')) {
      state.libraryCount.set(sectionId, (state.libraryCount.get(sectionId) || 0) + 1);
  }
};

// ============================================================================
// LAB SCHEDULING
// ============================================================================

const scheduleLabsForSection = (
  state: ScheduleState,
  subjects: Subject[],
  rooms: Room[],
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
  // Labs are typically 2 or 3 periods. We will schedule them in 2-period blocks.
  const numLabSessions = Math.floor(periodsPerLab / 2);

  const preferredBlocks: number[][] = [[1, 2], [3, 4], [6, 7]];
  let scheduledPeriods = 0;

  for (const lab of labSubjects) {
      for (let i = 0; i < numLabSessions; i++) {
        let sessionScheduled = false;
        for (const day of shuffle([...workingDays])) {
          if (sessionScheduled) break;
          
          const dayKey = `${section.id}-${day}`;
          if (state.labDayUsage.has(dayKey) && state.labDayUsage.get(dayKey)!.size > 0) {
            continue; // Day already has a lab block
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
                    if (roomAssignments.some(r => r.id === room.id) || facultyAssignments.includes(currentLab.assignedFacultyId)) continue;
                    
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
              }
              sessionScheduled = true;
              
              if (!state.labDayUsage.has(dayKey)) state.labDayUsage.set(dayKey, new Set());
              labSubjects.forEach(l => state.labDayUsage.get(dayKey)!.add(l.id));
            }
          }
        }
      }
  }

  const totalRequired = labSubjects.reduce((acc, s) => acc + Math.floor(s.periodsPerWeek / 2) * 2, 0);
  return totalRequired - scheduledPeriods;
};

// ============================================================================
// DETERMINISTIC THEORY SCHEDULING
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
  
  // Create a flat list of all theory periods needed, DO NOT SHUFFLE
  const subjectQueue = theorySubjects.flatMap(s => Array(s.periodsPerWeek).fill(s));

  let unscheduledCount = subjectQueue.length;

  // Sequential First-Fit approach - NO SHUFFLING of days or periods
  for (const day of workingDays) {
      const allDayPeriods = [...PRE_LUNCH_PERIODS, ...POST_LUNCH_PERIODS];
      for (const period of allDayPeriods) {
          if (subjectQueue.length === 0) break; // All subjects scheduled

          // Check if section is already busy
          if (state.sectionBusy.has(`${section.id}-${day}-${period}`)) continue;
          
          // Find a subject that can be placed here
          for (let i = 0; i < subjectQueue.length; i++) {
              const subject = subjectQueue[i];
              
              if (canPlaceTheory(state, subject.id, section.id, day) &&
                  isSlotAvailable(state, subject.assignedFacultyId, preferredRoom.id, section.id, day, period)) 
              {
                  addEntry(state, day, period, subject.id, subject.assignedFacultyId, preferredRoom.id, section.id);
                  subjectQueue.splice(i, 1); // Remove from queue
                  unscheduledCount--;
                  break; // Move to next period
              }
          }
      }
      if (subjectQueue.length === 0) break;
  }
  
  return unscheduledCount;
};


// ============================================================================
// STRATEGIC GAP FILLING
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

  for (const section of sections) {
    const workingDays = getWorkingDays(section.year);

    for (const day of workingDays) {
      const allDayPeriods = [...PRE_LUNCH_PERIODS, ...POST_LUNCH_PERIODS];

      for (const period of allDayPeriods) {
        // If the slot is empty, try to fill it
        if (!state.sectionBusy.has(`${section.id}-${day}-${period}`)) {
          
          // Try to fill with Library first, respecting the weekly limit
          if ((state.libraryCount.get(section.id) || 0) < MAX_LIBRARY_PERIODS_PER_WEEK && 
              isSlotAvailable(state, libSubject.assignedFacultyId, libRoom.id, section.id, day, period)) {
            addEntry(state, day, period, libSubject.id, libSubject.assignedFacultyId, libRoom.id, section.id);
          }
          // Else, try to fill with Sports
          else if (isSlotAvailable(state, sportsSubject.assignedFacultyId, groundRoom.id, section.id, day, period)) {
            addEntry(state, day, period, sportsSubject.id, sportsSubject.assignedFacultyId, groundRoom.id, section.id);
          }
        }
      }
    }
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
    labDayUsage: new Map(),
    libraryCount: new Map()
  };

  faculty.forEach(f => state.facultyLoad.set(f.id, 0));
  sections.forEach(s => state.libraryCount.set(s.id, 0));

  const sortedSections = [...sections].sort((a, b) => b.year - a.year);
  let totalUnscheduled = 0;

  // PHASE 1: Labs (Hardest Constraint)
  console.log('PHASE 1: LAB SCHEDULING');
  for (const section of sortedSections) {
    totalUnscheduled += scheduleLabsForSection(state, subjects, rooms, section);
  }

  // PHASE 2: Theory (Core Academic)
  console.log('PHASE 2: THEORY SCHEDULING (DETERMINISTIC PACKING)');
  for (const section of sortedSections) {
    totalUnscheduled += scheduleTheoryForSection(state, subjects, rooms, section);
  }

  // PHASE 3: Fill Remaining Gaps
  console.log('PHASE 3: COMPACTING & GAP FILLING');
  fillGapsAndCompact(state, subjects, rooms, sections);

  console.log(`Generation Complete. Total Unscheduled Periods: ${totalUnscheduled}`);
  
  return state.timetable.sort((a,b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.period - b.period);
};

