import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectSpinUpPage from "@/pages/ProjectSpinUpPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import SprintPlannerPage from "@/pages/SprintPlannerPage";
import MeetingsHubPage from "@/pages/MeetingsHubPage";
import ResearchWorkspacePage from "@/pages/ResearchWorkspacePage";
import LaunchConsolePage from "@/pages/LaunchConsolePage";
import SupportQueuePage from "@/pages/SupportQueuePage";
import BillingPage from "@/pages/BillingPage";
import SettingsPage from "@/pages/SettingsPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AiIntakePage from "@/pages/AiIntakePage";
import NotFoundPage from "@/pages/NotFoundPage";

// React Query client with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="opscrew-theme">
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects/spin-up" element={<ProjectSpinUpPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/projects/:id/sprints" element={<SprintPlannerPage />} />
              
              {/* Agent routes */}
              <Route path="/ai-intake" element={<AiIntakePage />} />
              <Route path="/meetings" element={<MeetingsHubPage />} />
              <Route path="/research" element={<ResearchWorkspacePage />} />
              <Route path="/launch" element={<LaunchConsolePage />} />
              <Route path="/support" element={<SupportQueuePage />} />
              
              {/* Settings and admin routes */}
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
