import { AnalyticsChart } from "./AnalyticsChart";

const projectVelocityData = [
  { name: 'Sprint 1', velocity: 24 },
  { name: 'Sprint 2', velocity: 28 },
  { name: 'Sprint 3', velocity: 32 },
  { name: 'Sprint 4', velocity: 30 },
  { name: 'Sprint 5', velocity: 35 },
  { name: 'Sprint 6', velocity: 38 },
];

const taskStatusData = [
  { name: 'Completed', value: 45 },
  { name: 'In Progress', value: 25 },
  { name: 'To Do', value: 20 },
  { name: 'Blocked', value: 10 },
];

const monthlyRevenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 22000 },
  { name: 'May', revenue: 25000 },
  { name: 'Jun', revenue: 28000 },
];

const teamPerformanceData = [
  { name: 'John', tasks: 12, completed: 10 },
  { name: 'Jane', tasks: 15, completed: 14 },
  { name: 'Mike', tasks: 8, completed: 7 },
  { name: 'Sarah', tasks: 18, completed: 16 },
  { name: 'Alex', tasks: 10, completed: 9 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnalyticsChart
        data={projectVelocityData}
        title="Team Velocity"
        type="line"
        dataKey="velocity"
        color="hsl(var(--primary))"
      />
      
      <AnalyticsChart
        data={taskStatusData}
        title="Task Status Distribution"
        type="pie"
        dataKey="value"
      />
      
      <AnalyticsChart
        data={monthlyRevenueData}
        title="Monthly Revenue"
        type="bar"
        dataKey="revenue"
        color="hsl(var(--success))"
      />
      
      <AnalyticsChart
        data={teamPerformanceData}
        title="Team Performance"
        type="bar"
        dataKey="completed"
        color="hsl(var(--info))"
      />
    </div>
  );
}