import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ArrowRight, BookOpen, Users, Building, History } from 'lucide-react';
import { courses, professors, rooms, changeLogs } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      href: '/admin/data',
      color: 'text-blue-500',
    },
    {
      title: 'Total Professors',
      value: professors.length,
      icon: Users,
      href: '/admin/data',
      color: 'text-green-500',
    },
    {
      title: 'Available Rooms',
      value: rooms.length,
      icon: Building,
      href: '/admin/data',
      color: 'text-orange-500',
    },
    {
      title: 'Recent Changes',
      value: changeLogs.length,
      icon: History,
      href: '/admin/changelog',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Admin Dashboard"
        description="Welcome back, Admin! Here's an overview of your institution's data."
      >
        <Button asChild>
          <Link href="/admin/timetable">
            Go to Timetable <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Link href={stat.href} className="text-xs text-muted-foreground flex items-center hover:underline">
                View details <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card className="mt-8">
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common tasks directly from here.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
                <Link href="/admin/timetable">Manage Timetable</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href="/admin/data">Import Data</Link>
            </Button>
             <Button asChild variant="secondary">
                <Link href="/admin/changelog">View Change Log</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
