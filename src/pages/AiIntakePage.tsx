import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bot, 
  Users, 
  FileText, 
  Shield, 
  Settings,
  MessageSquare,
  User,
  Package,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { AiChatInterface } from '@/components/ai-intake/AiChatInterface';
import { LeadSummaryCard } from '@/components/ai-intake/LeadSummaryCard';
import { ProposalPreview } from '@/components/ai-intake/ProposalPreview';
import { AdminApprovals } from '@/components/ai-intake/AdminApprovals';
import type { LeadSummary, Proposal, AdminApproval } from '@/types';

export default function AiIntakePage() {
  const [currentStep, setCurrentStep] = useState<'chat' | 'lead' | 'proposal' | 'approvals'>('chat');
  const [leadData, setLeadData] = useState<LeadSummary | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [conversationId, setConversationId] = useState<string>('conv_' + Date.now());

  // Mock data for development
  const mockLead: LeadSummary = {
    id: 'lead_123',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'TechStart Inc.',
    phone: '+1-555-0123',
    projectType: 'E-commerce Platform',
    budgetRange: '$50,000 - $100,000',
    timeline: '3-6 months',
    qualificationScore: 85,
    recommendedPackages: [
      {
        id: 'pkg_1',
        name: 'Professional E-commerce',
        description: 'Full-featured e-commerce platform with payment integration',
        price: 75000,
        duration: '4-5 months',
        features: ['Product catalog', 'Payment processing', 'User management', 'Admin dashboard'],
        confidence: 0.9,
        reasoning: 'High budget range and clear e-commerce requirements'
      }
    ],
    extractedRequirements: [
      'Multi-vendor marketplace',
      'Payment gateway integration',
      'Mobile responsive design',
      'Inventory management'
    ],
    painPoints: [
      'Current system is outdated',
      'Poor mobile experience',
      'Limited payment options'
    ],
    decisionMakers: ['John Doe (CEO)', 'Sarah Smith (CTO)'],
    urgency: 'medium',
    source: 'intake_chat',
    status: 'qualified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const mockProposal: Proposal = {
    id: 'prop_123',
    leadId: 'lead_123',
    title: 'E-commerce Platform Development Proposal',
    executiveSummary: 'We propose to develop a comprehensive e-commerce platform that addresses your current challenges and positions your business for growth. Our solution will provide a modern, mobile-responsive platform with advanced features tailored to your specific needs.',
    projectScope: 'This project includes the complete development of a multi-vendor e-commerce platform with payment processing, user management, inventory tracking, and administrative dashboard. The platform will be built using modern technologies and best practices for scalability and security.',
    deliverables: [
      'Fully functional e-commerce website',
      'Mobile-responsive design',
      'Payment gateway integration',
      'Admin dashboard for management',
      'User authentication system',
      'Inventory management system',
      'Documentation and training'
    ],
    timeline: '4-5 months',
    pricing: {
      basePrice: 75000,
      packages: [
        {
          id: 'pkg_1',
          name: 'Professional E-commerce',
          description: 'Full-featured e-commerce platform with payment integration',
          price: 75000,
          duration: '4-5 months',
          features: ['Product catalog', 'Payment processing', 'User management', 'Admin dashboard'],
          selected: true
        }
      ],
      addOns: [
        {
          id: 'addon_1',
          name: 'Mobile App Development',
          description: 'Native iOS and Android apps',
          price: 25000,
          selected: false
        },
        {
          id: 'addon_2',
          name: 'Advanced Analytics',
          description: 'Comprehensive reporting and analytics dashboard',
          price: 10000,
          selected: false
        }
      ],
      totalPrice: 75000,
      paymentTerms: '50% upfront, 50% on completion',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    terms: [
      'Project timeline is estimated and may vary based on requirements',
      'Payment terms: 50% upfront, 50% on completion',
      'All deliverables include 3 months of post-launch support',
      'Client is responsible for providing content and assets',
      'Additional features beyond scope will be quoted separately'
    ],
    nextSteps: [
      'Review and approve this proposal',
      'Sign the project agreement',
      'Provide initial payment (50%)',
      'Schedule project kickoff meeting',
      'Begin development phase'
    ],
    status: 'draft',
    requiresApproval: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const mockApprovals: AdminApproval[] = [
    {
      id: 'approval_1',
      proposalId: 'prop_123',
      requestedBy: 'John Smith',
      requestedAt: new Date().toISOString(),
      status: 'pending',
      reason: 'High-value proposal requires management review'
    }
  ];

  const handleLeadExtracted = (lead: any) => {
    setLeadData(lead);
    setCurrentStep('lead');
  };

  const handleConversationComplete = () => {
    // Conversation completed, lead should be extracted
    console.log('Conversation completed');
  };

  const handleGenerateProposal = () => {
    setProposal(mockProposal);
    setCurrentStep('proposal');
  };

  const handleSaveLead = () => {
    console.log('Saving lead:', leadData);
    // Implement save lead functionality
  };

  const handleCreateProject = () => {
    console.log('Creating project from lead:', leadData);
    // Implement create project functionality
  };

  const handleProposalUpdate = (updates: Partial<Proposal>) => {
    setProposal(prev => prev ? { ...prev, ...updates } : null);
  };

  const handleRequestApproval = () => {
    console.log('Requesting admin approval for proposal:', proposal?.id);
    // Implement approval request
  };

  const handleSendProposal = () => {
    console.log('Sending proposal:', proposal?.id);
    // Implement send proposal functionality
  };

  const handleDownloadProposal = () => {
    console.log('Downloading proposal:', proposal?.id);
    // Implement download functionality
  };

  const handleApproveProposal = (approvalId: string, comments?: string) => {
    console.log('Approving proposal:', approvalId, comments);
    // Implement approval functionality
  };

  const handleRejectProposal = (approvalId: string, reason: string) => {
    console.log('Rejecting proposal:', approvalId, reason);
    // Implement rejection functionality
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Intake & Proposal Generation</h1>
            <p className="text-muted-foreground">
              Qualify leads and generate proposals using AI-powered automation
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="approval-toggle">Require Admin Approval</Label>
              <Switch
                id="approval-toggle"
                checked={requiresApproval}
                onCheckedChange={setRequiresApproval}
              />
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentStep === 'chat' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">AI Chat</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentStep === 'lead' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Lead Summary</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentStep === 'proposal' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Proposal</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentStep === 'approvals' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Approvals</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="lead" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Lead Summary
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Proposal
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Approvals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AiChatInterface
                  conversationId={conversationId}
                  onLeadExtracted={handleLeadExtracted}
                  onConversationComplete={handleConversationComplete}
                />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      AI Agent Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Online & Ready</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      The AI agent is actively listening and ready to help qualify your leads.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Conversations Today</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Leads Qualified</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Proposals Generated</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lead" className="space-y-6">
            {leadData ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadSummaryCard
                  lead={leadData}
                  onGenerateProposal={handleGenerateProposal}
                  onSaveLead={handleSaveLead}
                  onCreateProject={handleCreateProject}
                />
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button onClick={handleGenerateProposal} className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Proposal
                      </Button>
                      <Button variant="outline" onClick={handleSaveLead} className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Save as Lead
                      </Button>
                      <Button variant="outline" onClick={handleCreateProject} className="w-full">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Create Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <User className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Lead Data</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Complete the AI chat conversation to extract lead information.
                  </p>
                  <Button onClick={() => setCurrentStep('chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start AI Chat
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="proposal" className="space-y-6">
            {proposal ? (
              <ProposalPreview
                proposal={proposal}
                onUpdate={handleProposalUpdate}
                onSave={() => console.log('Proposal saved')}
                onSend={handleSendProposal}
                onRequestApproval={handleRequestApproval}
                onDownload={handleDownloadProposal}
                isEditable={true}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Proposal Generated</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Generate a proposal from the lead summary to get started.
                  </p>
                  <Button onClick={() => setCurrentStep('lead')}>
                    <User className="w-4 h-4 mr-2" />
                    View Lead Summary
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <AdminApprovals
              approvals={mockApprovals}
              onApprove={handleApproveProposal}
              onReject={handleRejectProposal}
              isAdmin={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
