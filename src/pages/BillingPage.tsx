import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Settings } from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing & Checkout</h1>
            <p className="text-muted-foreground">Manage your subscription and payment methods</p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Billing Settings
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
            <CardDescription>View and manage your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Billing interface will be implemented here
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}