import { schedule } from '@/lib/mock-data';
import { TimetableView } from '@/components/timetable-view';
import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col">
       <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">College Timetable Ace</Link>
            <nav>
            <Button asChild>
                <Link href="/login">Admin/Faculty Login</Link>
            </Button>
            </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <PageHeader
          title="Public Class Schedule"
          description="Browse all available classes for the current semester."
        >
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search course or professor..." className="pl-10 w-48 md:w-64" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PageHeader>
        <TimetableView schedule={schedule} />
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} College Timetable Ace. All rights reserved.</p>
      </footer>
    </div>
  );
}
