'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  LayoutDashboard,
  CalendarDays,
  Database,
  History,
  LogOut,
  PanelLeft,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';


const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/timetable', icon: CalendarDays, label: 'Timetable' },
  { href: '/admin/data', icon: Database, label: 'Data Management' },
  { href: '/admin/changelog', icon: History, label: 'Change Log' },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2">
          <Icons.logo className="w-7 h-7" />
          <span className="text-lg font-semibold font-headline">
            Timetable Ace
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@college.edu</span>
          </div>
        </div>
        <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}


function MobileAdminNav() {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                 <div className="flex h-full flex-col p-4 bg-sidebar text-sidebar-foreground">
                    <div className="flex items-center gap-2 p-2 border-b border-sidebar-border mb-4">
                        <Icons.logo className="w-7 h-7" />
                        <span className="text-lg font-semibold font-headline">Timetable Ace</span>
                    </div>
                    <nav className="flex-1">
                        <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                                <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className="w-full justify-start gap-2"
                                >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                                </Button>
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </nav>
                     <div className="mt-auto">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <LogOut className="h-5 w-5" /> Logout
                            </Button>
                        </Link>
                     </div>
                 </div>
            </SheetContent>
        </Sheet>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <div className="min-h-screen flex flex-col">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                   <Link href="/admin" className="flex items-center gap-2">
                        <Icons.logo className="w-6 h-6" />
                        <span className="text-lg font-semibold font-headline">Admin</span>
                    </Link>
                   <MobileAdminNav />
                </header>
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        )
    }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
