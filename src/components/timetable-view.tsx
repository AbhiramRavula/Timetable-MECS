import type { ScheduleEntry } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type TimetableViewProps = {
  schedule: ScheduleEntry[];
  highlightProfessor?: string;
};

export function TimetableView({ schedule, highlightProfessor }: TimetableViewProps) {
  const sortedSchedule = [...schedule].sort((a, b) => {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    if (dayOrder.indexOf(a.day) !== dayOrder.indexOf(b.day)) {
      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    }
    return a.startTime.localeCompare(b.startTime);
  });
  
  if (schedule.length === 0) {
    return (
        <div className="flex items-center justify-center h-48 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No schedule entries found.</p>
        </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Day</TableHead>
            <TableHead className="w-[150px]">Time</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead>Room</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSchedule.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.day}</TableCell>
              <TableCell>{`${entry.startTime} - ${entry.endTime}`}</TableCell>
              <TableCell>
                <div>
                  <p className="font-semibold">{entry.course.name}</p>
                  <p className="text-sm text-muted-foreground">{entry.course.code}</p>
                </div>
              </TableCell>
              <TableCell>
                {highlightProfessor === entry.professor.name ? (
                  <Badge>{entry.professor.name}</Badge>
                ) : (
                  entry.professor.name
                )}
              </TableCell>
              <TableCell>{entry.room.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
