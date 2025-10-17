import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Video, FileText, Users } from "lucide-react";

export default function MeetingsHubPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meetings & Comms Hub</h1>
            <p className="text-muted-foreground">Manage meeting ingestion, summaries and follow-up tickets</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comms Agent</CardTitle>
            <CardDescription>AI-powered meeting summaries and action item extraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Meetings hub interface will be implemented here
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}