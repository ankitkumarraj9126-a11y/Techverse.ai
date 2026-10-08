"use client";

import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavItems, bottomNavItems } from "./Sidebar";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 w-full max-w-md">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 flex flex-col">
            <div className="p-6 h-16 flex items-center border-b border-border/50 bg-background/50 backdrop-blur-sm">
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
          </SheetContent>
        </Sheet>
        
        <div className="relative group flex-1 hidden md:flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            type="search" 
            placeholder="Search leads, companies..." 
            className="pl-9 bg-muted/30 w-full border-transparent focus-visible:bg-transparent transition-all" 
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </Button>
        <div className="h-8 w-px bg-border mx-2"></div>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-sm font-medium">AK</span>
          </div>
        </Button>
      </div>
    </header>
  );
}
