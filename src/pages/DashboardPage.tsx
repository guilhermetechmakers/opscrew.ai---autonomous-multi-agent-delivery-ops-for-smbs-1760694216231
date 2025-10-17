import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardCharts } from "@/components/charts/DashboardCharts";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Users,
  FolderOpen,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
} from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 this week",
    trend: "up",
    icon: FolderOpen,
    color: "text-blue-500",
  },
  {
    title: "Open Leads",
    value: "8",
    change: "+3 today",
    trend: "up",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "SLA Breaches",
    value: "2",
    change: "-1 this week",
    trend: "down",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    title: "Team Velocity",
    value: "42",
    change: "+5 this sprint",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "project",
    title: "E-commerce Platform - Phase 2",
    description: "Sprint 3 completed successfully",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "lead",
    title: "New lead from intake chat",
    description: "Sarah Johnson - TechStart Inc.",
    time: "4 hours ago",
    status: "new",
  },
  {
    id: 3,
    type: "meeting",
    title: "Client Review Meeting",
    description: "Scheduled for tomorrow at 2 PM",
    time: "6 hours ago",
    status: "scheduled",
  },
  {
    id: 4,
    type: "deployment",
    title: "Mobile App v2.1",
    description: "Successfully deployed to production",
    time: "1 day ago",
    status: "completed",
  },
];

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    client: "TechStart Inc.",
    status: "active",
    progress: 75,
    deadline: "2024-02-15",
    team: ["John Doe", "Jane Smith", "Mike Chen"],
  },
  {
    id: 2,
    name: "Mobile Banking App",
    client: "FinanceCorp",
    status: "active",
    progress: 45,
    deadline: "2024-03-01",
    team: ["Alice Johnson", "Bob Wilson"],
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    client: "DataViz Co.",
    status: "planning",
    progress: 10,
    deadline: "2024-03-15",
    team: ["Carol Davis", "David Lee"],
  },
];

const quickActions = [
  { title: "Start New Project", description: "Create a new project from scratch", icon: Plus },
  { title: "AI Intake Chat", description: "Qualify a new lead", icon: Activity },
  { title: "Schedule Meeting", description: "Book a client meeting", icon: Clock },
  { title: "View Reports", description: "Check project analytics", icon: TrendingUp },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleQuickAction = (actionTitle: string) => {
    switch (actionTitle) {
      case "AI Intake Chat":
        navigate("/ai-intake");
        break;
      case "Start New Project":
        navigate("/projects/spin-up");
        break;
      case "Schedule Meeting":
        navigate("/meetings");
        break;
      case "View Reports":
        // Could navigate to analytics or reports page
        break;
      default:
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your projects and agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickAction(action.title)}
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon className="h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <DashboardCharts />

        {/* Projects Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Your current projects and their progress</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <Badge variant={project.status === "active" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}