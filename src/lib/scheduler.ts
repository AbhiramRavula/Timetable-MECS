
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

// ============================================================================
// CONSTRAINT VALIDATION
// ============================================================================

const isSlotAvailable = (
  state: ScheduleState,
  faculty: Faculty[],
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
  
  const fac = faculty.find(f => f.id === facultyId);
  if (fac && (state.facultyLoad.get(facultyId) || 0) >= fac.weeklyLoad) return false;
  
  return true;
};

const canPlaceTheory = (
  state: ScheduleState,
  subjectId: string,
  sectionId: string,
  day: string,
  period: number
): boolean => {
  const dayKey = `${subjectId}-${sectionId}-${day}`;
  if ((state.subjectDayCount.get(dayKey) || 0) >= 2) return false;

  // Check 3-consecutive rule (no 3 in a row)
  const adjacentPeriods = [period - 2, period - 1, period + 1, period + 2]
    .filter(p => PERIODS.includes(p) && p !== LUNCH_PERIOD);
  
  const sameSubjectAdjacent = state.timetable.filter(t => 
    t.sectionId === sectionId && t.day === day && 
    adjacentPeriods.includes(t.period) && t.subjectId === subjectId
  );

  // If there are already 2 adjacent same subjects, can't add 3rd
  if (sameSubjectAdjacent.length >= 2) {
    const periods = sameSubjectAdjacent.map(t => t.period).sort((a, b) => a - b);
    for (let i = 0; i < periods.length - 1; i++) {
      if (periods[i + 1] - periods[i] === 1) {
        // Already have 2 consecutive, check if adding this would make 3
        if (period === periods[i] - 1 || period === periods[i + 1] + 1) return false;
      }
    }
  }

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

  // CRITICAL: Batches based on NUMBER OF LABS, not student strength
  const numBatches = labSubjects.length;
  const batchLetters = ['A', 'B', 'C'];

  if (numBatches > labRooms.length) {
    console.warn(`   ⚠️  Insufficient lab rooms for ${numBatches} batches!`);
    return labSubjects.reduce((acc, s) => acc + s.periodsPerWeek, 0);
  }

  // Calculate how many rotation days needed
  const periodsPerLab = labSubjects[0]?.periodsPerWeek || 3;
  const rotationDays = Math.floor(periodsPerLab / 2); // Assuming labs are 2 periods long

  const preferredBlocks: number[][] = [[1, 2], [3, 4], [6, 7]];
  
  let scheduledRotations = 0;

  // Try to schedule all rotation days
  for (let rotationIndex = 0; rotationIndex < rotationDays; rotationIndex++) {
    let scheduled = false;

    // Try to find a day for this rotation
    for (const day of shuffle([...workingDays])) {
      if (scheduled) break;

      const dayKey = `${section.id}-${day}`;
      if (state.labDayUsage.has(dayKey) && state.labDayUsage.get(dayKey)!.size > 0) {
        continue;
      }

      for (const [p1, p2] of preferredBlocks) {
        if (scheduled) break;

        let allBatchesAvailable = true;
        const roomAssignments: Room[] = [];
        const facultyAssignments: string[] = [];

        for (let batchIdx = 0; batchIdx < numBatches; batchIdx++) {
          const labIndex = (batchIdx + rotationIndex) % numBatches; // ROTATION LOGIC
          const lab = labSubjects[labIndex];
          
          let foundRoom = false;
          for (const room of labRooms) {
            if (roomAssignments.some(r => r.id === room.id)) continue; 

            if (
              isSlotAvailable(state, faculty, lab.assignedFacultyId, room.id, section.id, day, p1) &&
              isSlotAvailable(state, faculty, lab.assignedFacultyId, room.id, section.id, day, p2) &&
              !facultyAssignments.includes(lab.assignedFacultyId)
            ) {
              roomAssignments.push(room);
              facultyAssignments.push(lab.assignedFacultyId);
              foundRoom = true;
              break;
            }
          }

          if (!foundRoom) {
            allBatchesAvailable = false;
            break;
          }
        }

        if (allBatchesAvailable && roomAssignments.length === numBatches) {
          for (let batchIdx = 0; batchIdx < numBatches; batchIdx++) {
            const labIndex = (batchIdx + rotationIndex) % numBatches;
            const lab = labSubjects[labIndex];
            const batchName = `${batchLetters[batchIdx]}`;
            const room = roomAssignments[batchIdx];

            addEntry(state, day, p1, lab.id, lab.assignedFacultyId, room.id, section.id, batchName);
            addEntry(state, day, p2, lab.id, lab.assignedFacultyId, room.id, section.id, batchName);
          }

          if (!state.labDayUsage.has(dayKey)) {
            state.labDayUsage.set(dayKey, new Set());
          }
          labSubjects.forEach(lab => state.labDayUsage.get(dayKey)!.add(lab.id));

          scheduled = true;
          scheduledRotations++;
        }
      }
    }

    if (!scheduled) {
      console.warn(`   ✗ Failed to schedule rotation ${rotationIndex + 1}`);
    }
  }

  const unscheduledPeriods = (labSubjects.reduce((acc, s) => acc + s.periodsPerWeek, 0)) - (scheduledRotations * numBatches * 2);
  return unscheduledPeriods > 0 ? unscheduledPeriods : 0;
};

// ============================================================================
// INTELLIGENT THEORY SCHEDULING
// ============================================================================

const scheduleTheoryForSection = (
  state: ScheduleState,
  subjects: Subject[],
  rooms: Room[],
  faculty: Faculty[],
  section: Section
): number => {
  const theorySubjects = subjects.filter(
    s => s.type === SubjectType.THEORY &&
         s.year === section.year &&
         s.semester === section.semester &&
         (s.section === '' || s.section === section.name) &&
         s.code !== 'LIB' && s.code !== 'SPORTS'
  ).sort((a, b) => b.periodsPerWeek - a.periodsPerWeek);

  const preferredRoom = rooms.find(r => r.id === section.defaultRoomId) || 
                       rooms.find(r => r.type === SubjectType.THEORY);
  
  if (!preferredRoom) return theorySubjects.reduce((sum, s) => sum + s.periodsPerWeek, 0);

  const workingDays = getWorkingDays(section.year);
  let unscheduled = 0;

  for (const subject of theorySubjects) {
    let remaining = subject.periodsPerWeek;

    const dayDistribution = remaining === 4 ? 2 : (remaining === 3 ? 3 : remaining);
    let daysToUse = shuffle([...workingDays]);

    for (const day of daysToUse) {
      if (remaining <= 0) break;

      const periodsThisDay = Math.min(remaining, Math.ceil(subject.periodsPerWeek / dayDistribution));
      let addedToday = 0;

      const priorityPeriods = [...PRE_LUNCH_PERIODS, ...POST_LUNCH_PERIODS];

      for (const period of shuffle(priorityPeriods)) {
        if (addedToday >= periodsThisDay || remaining <= 0) break;

        if (canPlaceTheory(state, subject.id, section.id, day, period) &&
            isSlotAvailable(state, faculty, subject.assignedFacultyId, preferredRoom.id, section.id, day, period)) {
          
          addEntry(state, day, period, subject.id, subject.assignedFacultyId, preferredRoom.id, section.id);
          remaining--;
          addedToday++;
        }
      }
    }

    if (remaining > 0) {
      // Try again on any available slot
      for (const day of workingDays) {
        for (const period of priorityPeriods) {
            if (remaining <= 0) break;
            if (canPlaceTheory(state, subject.id, section.id, day, period) &&
                isSlotAvailable(state, faculty, subject.assignedFacultyId, preferredRoom.id, section.id, day, period)) {
              addEntry(state, day, period, subject.id, subject.assignedFacultyId, preferredRoom.id, section.id);
              remaining--;
            }
        }
         if (remaining <= 0) break;
      }
    }


    if (remaining > 0) {
      console.warn(`   ✗ ${subject.name}: ${remaining} periods unscheduled`);
      unscheduled += remaining;
    }
  }

  return unscheduled;
};

// ============================================================================
// STRATEGIC GAP FILLING
// ============================================================================

const fillGaps = (
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

  let gapsFilled = 0;

  for (const section of sections) {
    const workingDays = getWorkingDays(section.year);

    for (const day of workingDays) {
      // Fill gaps to avoid free periods between classes
      const periodsForDay = state.timetable
        .filter(t => t.sectionId === section.id && t.day === day)
        .map(t => t.period)
        .sort((a,b) => a - b);
      
      if(periodsForDay.length === 0) continue;

      const firstPeriod = periodsForDay[0];
      const lastPeriod = periodsForDay[periodsForDay.length - 1];

      for(let p = firstPeriod; p <= lastPeriod; p++) {
        if (p === LUNCH_PERIOD) continue;
        if(!periodsForDay.includes(p)) {
            // Gap found
            const slotKey = `${section.id}-${day}-${p}`;
            if (state.sectionBusy.has(slotKey)) continue;

            addEntry(state, day, p, libSubject.id, libSubject.assignedFacultyId, libRoom.id,section.id);
            gapsFilled++;
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
    totalUnscheduled += scheduleTheoryForSection(state, subjects, rooms, faculty, section);
  }

  // PHASE 3: Fill Gaps
  console.log('PHASE 3: GAP FILLING');
  fillGaps(state, subjects, rooms, sections);

  console.log(`Generation Complete. Total Unscheduled Periods: ${totalUnscheduled}`);

  return state.timetable;
};
