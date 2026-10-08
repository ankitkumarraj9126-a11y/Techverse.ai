"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Search,
  BookOpen,
  MonitorCheck,
  Send,
  KanbanSquare,
  BarChart,
  Bell,
  Settings,
} from "lucide-react";

export const mainNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", href: "/leads", icon: Users },
  { title: "Discovery", href: "/discovery", icon: Search },
  { title: "Research", href: "/research", icon: BookOpen },
  { title: "Website Audits", href: "/audits", icon: MonitorCheck },
  { title: "Outreach", href: "/outreach", icon: Send },
  { title: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { title: "Analytics", href: "/analytics", icon: BarChart },
];

export const bottomNavItems = [
  { title: "Notifications", href: "/notifications", icon: Bell },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 border-r bg-muted/40 flex-col h-screen fixed sticky top-0 left-0">
      <div className="p-6 h-16 flex items-center">
        <span className="font-bold text-xl tracking-tight">TechVerse AI</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-6">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-primary hover:translate-x-1"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-primary rounded-lg -z-10" />
              )}
              <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 bg-muted/10 space-y-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-primary hover:translate-x-1"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-primary rounded-lg -z-10" />
              )}
              <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
              {item.title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
