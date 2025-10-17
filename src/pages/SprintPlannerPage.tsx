import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, Target } from "lucide-react";

export default function SprintPlannerPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sprint Planner</h1>
            <p className="text-muted-foreground">Plan and manage your sprints with AI assistance</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Sprint
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sprint Management</CardTitle>
            <CardDescription>PM Agent powered sprint planning and task management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Sprint planning interface will be implemented here
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}