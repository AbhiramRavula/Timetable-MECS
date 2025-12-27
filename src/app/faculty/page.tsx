import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { TimetableView } from '@/components/timetable-view';
import { schedule, professors } from '@/lib/mock-data';
import { Download } from 'lucide-react';

export default function FacultyPage() {
  const loggedInProfessor = professors.find(p => p.name === 'Dr. Evelyn Reed');

  if (!loggedInProfessor) {
    return <div>Professor not found.</div>;
  }
  
  const facultySchedule = schedule.filter(
    (entry) => entry.professor.id === loggedInProfessor.id
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="My Timetable"
        description={`Welcome, ${loggedInProfessor.name}. Here is your teaching schedule for the semester.`}
      >
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download Excel
        </Button>
      </PageHeader>
      <TimetableView
        schedule={facultySchedule}
        highlightProfessor={loggedInProfessor.name}
      />
    </div>
  );
}
