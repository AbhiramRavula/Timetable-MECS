import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { courses, professors } from '@/lib/mock-data';

export default function DataManagementPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Data Management"
        description="Import and manage courses, professors, and rooms."
      >
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Import from CSV
        </Button>
      </PageHeader>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="professors">Professors</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                List of all courses available in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professors">
          <Card>
            <CardHeader>
              <CardTitle>Professors</CardTitle>
              <CardDescription>
                List of all professors available in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professors.map((prof) => (
                    <TableRow key={prof.id}>
                      <TableCell className="font-medium">{prof.name}</TableCell>
                      <TableCell>{prof.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
