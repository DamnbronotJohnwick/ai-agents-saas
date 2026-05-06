import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AgentsGrid } from "@/components/agents-grid";
import { TasksChart, TopAgentsChart, ExecutionTimeChart } from "@/components/charts";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Central de Agentes
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerencie e monitore seus agentes de IA
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TasksChart />
            <TopAgentsChart />
            <ExecutionTimeChart />
          </div>

          <AgentsGrid />
        </main>
      </div>
    </div>
  );
}
