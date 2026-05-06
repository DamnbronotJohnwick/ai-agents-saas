"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tasksPerHour, topAgents, avgExecutionTime } from "@/lib/agents-data";

export function TasksChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Tarefas Completadas por Hora
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={tasksPerHour}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.7 0.22 280)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.7 0.22 280)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.25 0.03 280)"
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.025 280)",
                border: "1px solid oklch(0.25 0.03 280)",
                borderRadius: "8px",
                color: "oklch(0.95 0.01 270)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="oklch(0.7 0.22 280)"
              strokeWidth={2}
              fill="url(#colorTasks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TopAgentsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Agentes Mais Usados
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topAgents} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.25 0.03 280)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.025 280)",
                border: "1px solid oklch(0.25 0.03 280)",
                borderRadius: "8px",
                color: "oklch(0.95 0.01 270)",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="tasks"
              fill="oklch(0.65 0.18 250)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ExecutionTimeChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">
        Tempo Medio de Execucao (min)
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={avgExecutionTime}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.25 0.03 280)"
              vertical={false}
            />
            <XAxis
              dataKey="agent"
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.6 0.02 270)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.025 280)",
                border: "1px solid oklch(0.25 0.03 280)",
                borderRadius: "8px",
                color: "oklch(0.95 0.01 270)",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="time" fill="oklch(0.7 0.12 200)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
