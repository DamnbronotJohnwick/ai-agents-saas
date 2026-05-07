"use client";

import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AgentCategory, categories } from "@/lib/agents-data";

interface FiltersProps {
  sortBy: "number" | "name" | "status" | "tasks";
  onSortChange: (sort: "number" | "name" | "status" | "tasks") => void;
  filterCategory: AgentCategory | "all";
  onFilterChange: (category: AgentCategory | "all") => void;
}

export function Filters({
  sortBy,
  onSortChange,
  filterCategory,
  onFilterChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={16} className="text-muted-foreground" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as typeof sortBy)}
          className="bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="number">Por Número</option>
          <option value="name">Por Nome</option>
          <option value="status">Por Status</option>
          <option value="tasks">Por Uso</option>
        </select>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-muted-foreground" />
        <select
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value as AgentCategory | "all")}
          className="bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="all">Todas as Funções</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="hidden lg:flex items-center gap-2 ml-auto">
        <button
          onClick={() => onFilterChange("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
            filterCategory === "all"
              ? "bg-primary text-foreground"
              : "bg-accent border border-border text-muted-foreground hover:text-foreground hover:border-border-light"
          )}
        >
          Todos
        </button>
        {categories.slice(0, 5).map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              filterCategory === cat
                ? "bg-primary text-foreground"
                : "bg-accent border border-border text-muted-foreground hover:text-foreground hover:border-border-light"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
