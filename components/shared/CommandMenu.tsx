"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search, LayoutDashboard, Users, Compass, BookOpen, Send, KanbanSquare, BarChart, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/leads"))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Leads</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/pipeline"))}>
            <KanbanSquare className="mr-2 h-4 w-4" />
            <span>Pipeline</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => {
            router.push("/discovery");
            toast.success("Navigated to Discovery module");
          })}>
            <Compass className="mr-2 h-4 w-4" />
            <span>Start Lead Discovery</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {
            router.push("/research");
            toast.success("Ready to research a new company");
          })}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Research Company</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {
            const nextTheme = theme === "dark" ? "light" : "dark";
            setTheme(nextTheme);
            toast(`Switched to ${nextTheme} mode`);
          })}>
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            <span>Toggle Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
