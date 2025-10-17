// User types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'pm' | 'developer' | 'stakeholder' | 'support';
  organization_id: string;
  created_at: string;
  updated_at: string;
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  domain?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'paused' | 'cancelled';
  organization_id: string;
  created_at: string;
  updated_at: string;
  client_name?: string;
  client_email?: string;
  budget?: number;
  deadline?: string;
}

// Lead types
export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'new' | 'qualified' | 'proposal_sent' | 'signed' | 'lost';
  source: 'intake_chat' | 'demo_request' | 'referral' | 'direct';
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  created_at: string;
  updated_at: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee_id?: string;
  project_id: string;
  sprint_id?: string;
  acceptance_criteria?: string;
  estimate?: number; // in hours
  created_at: string;
  updated_at: string;
}

// Sprint types
export interface Sprint {
  id: string;
  name: string;
  project_id: string;
  start_date: string;
  end_date: string;
  velocity?: number;
  status: 'planning' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

// Agent types
export interface Agent {
  id: string;
  name: string;
  type: 'intake' | 'spin_up' | 'pm' | 'comms' | 'research' | 'launch' | 'handover' | 'support';
  status: 'active' | 'inactive' | 'error';
  last_activity?: string;
  created_at: string;
  updated_at: string;
}

// Meeting types
export interface Meeting {
  id: string;
  title: string;
  project_id?: string;
  scheduled_at: string;
  duration?: number; // in minutes
  participants: string[];
  recording_url?: string;
  transcript?: string;
  summary?: string;
  action_items?: string[];
  created_at: string;
  updated_at: string;
}

// Support ticket types
export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee_id?: string;
  project_id?: string;
  sla_deadline?: string;
  created_at: string;
  updated_at: string;
}

// Billing types
export interface Subscription {
  id: string;
  organization_id: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

// API response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}