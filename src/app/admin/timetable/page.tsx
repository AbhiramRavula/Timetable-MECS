import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { schedule } from '@/lib/mock-data';
import { Bot, Edit, Send, Trash2 } from 'lucide-react';

export default function AdminTimetablePage() {
  const sortedSchedule = [...schedule].sort((a, b) => {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    if (dayOrder.indexOf(a.day) !== dayOrder.indexOf(b.day)) {
      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    }
    return a.startTime.localeCompare(b.startTime);
  });
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Manage Timetable"
        description="Generate, review, manually adjust, and publish the college timetable."
      >
        <Button variant="secondary">
          <Bot className="mr-2 h-4 w-4" /> Generate Timetable
        </Button>
        <Button>
          <Send className="mr-2 h-4 w-4" /> Publish Changes
        </Button>
      </PageHeader>
      
      <div className="rounded-lg border overflow-hidden">
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSchedule.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.day}</TableCell>
                  <TableCell>{`${entry.startTime} - ${entry.endTime}`}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{entry.course.name}</div>
                    <div className="text-sm text-muted-foreground">{entry.course.code}</div>
                  </TableCell>
                  <TableCell>{entry.professor.name}</TableCell>
                  <TableCell>{entry.room.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Entry</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete Entry</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
}
