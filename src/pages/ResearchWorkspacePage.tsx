import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Code, GitBranch } from "lucide-react";

export default function ResearchWorkspacePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Research & Copilot Workspace</h1>
            <p className="text-muted-foreground">Draft specs, user stories, and acceptance criteria with AI assistance</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Research Agent</CardTitle>
            <CardDescription>AI-powered spec generation and technical documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Research workspace interface will be implemented here
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}