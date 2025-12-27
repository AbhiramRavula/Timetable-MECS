import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
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
import { changeLogs } from '@/lib/mock-data';

function ActionBadge({ action }: { action: string }) {
  switch (action.toUpperCase()) {
    case 'GENERATE':
      return <Badge variant="default">Generate</Badge>;
    case 'UPDATE':
      return <Badge variant="secondary">Update</Badge>;
    case 'PUBLISH':
      return <Badge className="bg-green-600 hover:bg-green-700">Publish</Badge>;
    default:
      return <Badge variant="outline">{action}</Badge>;
  }
}

export default function ChangeLogPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Change Log"
        description="An audit trail of all changes made to the timetable system."
      />
      <Card>
        <CardHeader>
          <CardTitle>System History</CardTitle>
          <CardDescription>
            All administrative actions are logged here for review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">User</TableHead>
                <TableHead className="w-[120px]">Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changeLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.timestamp.toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <ActionBadge action={log.action} />
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
