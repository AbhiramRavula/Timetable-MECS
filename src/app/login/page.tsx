import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
                <Icons.logo className="h-8 w-8" />
                <span className="text-xl font-bold">College Timetable Ace</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Admin & Faculty Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">Sign In</Button>
            <Button variant="link" size="sm" asChild>
                <Link href="/schedule">View public schedules as student</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
