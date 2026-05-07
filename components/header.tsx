"use client";

import { Search, Rocket, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onlineCount: number;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Header({
  searchTerm,
  onSearchChange,
  onlineCount,
  darkMode,
  onDarkModeToggle,
}: HeaderProps) {
  return (
    <header className="h-16 bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-30 flex items-center justify-between px-8">
      {/* Logo & Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-foreground">AI</span>
          <span className="text-2xl font-bold text-primary">Agents</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-border">
          <span className="w-2 h-2 rounded-full bg-online animate-pulse-dot" />
          <span className="text-sm text-muted">
            <span className="text-foreground font-semibold">{onlineCount}</span> online
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar agentes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-accent border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-foreground font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]">
          <Rocket size={18} />
          <span className="hidden sm:inline">Deploy</span>
        </button>
      </div>
    </header>
  );
}
