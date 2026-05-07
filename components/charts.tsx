"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const tasksPerHourData = [
  { hour: "00:00", tasks: 12 },
  { hour: "02:00", tasks: 8 },
  { hour: "04:00", tasks: 5 },
  { hour: "06:00", tasks: 15 },
  { hour: "08:00", tasks: 45 },
  { hour: "10:00", tasks: 78 },
  { hour: "12:00", tasks: 65 },
  { hour: "14:00", tasks: 89 },
  { hour: "16:00", tasks: 95 },
  { hour: "18:00", tasks: 72 },
  { hour: "20:00", tasks: 48 },
  { hour: "22:00", tasks: 25 },
];

const topAgentsData = [
  { name: "Copy Master", tasks: 521 },
  { name: "Customer Service", tasks: 612 },
  { name: "Social Media", tasks: 445 },
  { name: "Lead Qualifier", tasks: 423 },
  { name: "Translator", tasks: 423 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-accent border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-semibold text-foreground">
          <span className="text-primary">{payload[0].value}</span> tarefas
        </p>
      </div>
    );
  }
  return null;
};

export function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Tasks per Hour */}
      <div className="bg-accent border border-border rounded-xl p-6">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-6">
          Tarefas por Hora
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tasksPerHourData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(42, 48, 80, 0.5)"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#FF1744"
                strokeWidth={2}
                dot={{ fill: "#FF1744", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#FF1744", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Agents */}
      <div className="bg-accent border border-border rounded-xl p-6">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-6">
          Agentes Mais Usados
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topAgentsData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(42, 48, 80, 0.5)"
                horizontal={false}
              />
              <XAxis
                type="number"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="tasks"
                fill="#FF1744"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
