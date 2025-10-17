import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Github, Settings, Zap } from "lucide-react";

const provisioningSteps = [
  {
    id: 1,
    title: "Repository Setup",
    description: "Create repository from template",
    status: "completed",
    icon: Github,
  },
  {
    id: 2,
    title: "CI/CD Pipeline",
    description: "Configure GitHub Actions",
    status: "completed",
    icon: Settings,
  },
  {
    id: 3,
    title: "Environment Provisioning",
    description: "Set up staging and production",
    status: "in_progress",
    icon: Zap,
  },
  {
    id: 4,
    title: "Secrets Management",
    description: "Configure environment variables",
    status: "pending",
    icon: Settings,
  },
  {
    id: 5,
    title: "Client Portal",
    description: "Deploy branded client portal",
    status: "pending",
    icon: CheckCircle,
  },
];

export default function ProjectSpinUpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Spin-Up Console</h1>
            <p className="text-muted-foreground">
              Automate repository creation, CI/CD setup, and environment provisioning
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Dry Run</Button>
            <Button>Start Provisioning</Button>
          </div>
        </div>

        {/* Provisioning Status */}
        <Card>
          <CardHeader>
            <CardTitle>Provisioning Summary</CardTitle>
            <CardDescription>
              Track the progress of your project setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provisioningSteps.map((step) => (
                <div key={step.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    {step.status === "completed" && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                    {step.status === "in_progress" && (
                      <Clock className="h-6 w-6 text-blue-500" />
                    )}
                    {step.status === "pending" && (
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <Badge variant={step.status === "completed" ? "default" : "secondary"}>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Repository Configuration</CardTitle>
              <CardDescription>
                Configure your VCS provider and repository settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">VCS Provider</label>
                  <div className="mt-2 flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button variant="outline" className="flex-1">
                      GitLab
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Bitbucket
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Repository Template</label>
                  <select className="w-full mt-2 p-2 border border-input rounded-md bg-card text-foreground">
                    <option>React + TypeScript</option>
                    <option>Next.js + Tailwind</option>
                    <option>Vue.js + Vite</option>
                    <option>Node.js + Express</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Settings</CardTitle>
              <CardDescription>
                Configure staging and production environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="staging" className="rounded" defaultChecked />
                  <label htmlFor="staging" className="text-sm font-medium text-foreground">
                    Enable Staging Environment
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="production" className="rounded" defaultChecked />
                  <label htmlFor="production" className="text-sm font-medium text-foreground">
                    Enable Production Environment
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Hosting Provider</label>
                  <select className="w-full mt-2 p-2 border border-input rounded-md bg-card text-foreground">
                    <option>Vercel</option>
                    <option>Netlify</option>
                    <option>AWS</option>
                    <option>Cloudflare</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provision Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Provision Logs</CardTitle>
            <CardDescription>
              Real-time logs from the provisioning process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div className="text-green-500">[2024-01-15 10:30:15] Repository created successfully</div>
              <div className="text-green-500">[2024-01-15 10:30:18] CI/CD pipeline configured</div>
              <div className="text-blue-500">[2024-01-15 10:30:22] Setting up staging environment...</div>
              <div className="text-muted-foreground">[2024-01-15 10:30:25] Waiting for environment to be ready...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}