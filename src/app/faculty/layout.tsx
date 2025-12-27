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
import { Calendar, LogOut, PanelLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

const navItems = [{ href: '/faculty', icon: Calendar, label: 'My Timetable' }];

function FacultySidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/faculty" className="flex items-center gap-2">
          <Icons.logo className="w-7 h-7" />
          <span className="text-lg font-semibold font-headline">
            Faculty Portal
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
            <AvatarImage src="https://picsum.photos/seed/prof1/100/100" alt="Dr. Reed" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Dr. Evelyn Reed</span>
            <span className="text-xs text-muted-foreground">
              e.reed@college.edu
            </span>
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

function MobileFacultyNav() {
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
                        <span className="text-lg font-semibold font-headline">Faculty Portal</span>
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

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <div className="min-h-screen flex flex-col">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                   <Link href="/faculty" className="flex items-center gap-2">
                        <Icons.logo className="w-6 h-6" />
                        <span className="text-lg font-semibold font-headline">Faculty</span>
                    </Link>
                   <MobileFacultyNav />
                </header>
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        )
    }

  return (
    <SidebarProvider>
      <FacultySidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
