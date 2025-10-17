import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Edit, 
  Save, 
  Send, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Shield,
  UserCheck
} from 'lucide-react';
import type { Proposal, PackageOption, AddOnOption } from '@/types';

interface ProposalPreviewProps {
  proposal: Proposal;
  onUpdate?: (updates: Partial<Proposal>) => void;
  onSave?: () => void;
  onSend?: () => void;
  onRequestApproval?: () => void;
  onDownload?: () => void;
  isEditable?: boolean;
}

export function ProposalPreview({ 
  proposal, 
  onUpdate, 
  onSave, 
  onSend, 
  onRequestApproval,
  onDownload,
  isEditable = true 
}: ProposalPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProposal, setEditedProposal] = useState(proposal);

  const handleSave = () => {
    onUpdate?.(editedProposal);
    onSave?.();
    setIsEditing(false);
  };

  const handlePackageToggle = (packageId: string) => {
    const updatedPackages = editedProposal.pricing.packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, selected: !pkg.selected } : pkg
    );
    setEditedProposal(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        packages: updatedPackages
      }
    }));
  };

  const handleAddOnToggle = (addOnId: string) => {
    const updatedAddOns = editedProposal.pricing.addOns.map(addOn => 
      addOn.id === addOnId ? { ...addOn, selected: !addOn.selected } : addOn
    );
    setEditedProposal(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        addOns: updatedAddOns
      }
    }));
  };

  const calculateTotal = () => {
    const selectedPackages = editedProposal.pricing.packages.filter(pkg => pkg.selected);
    const selectedAddOns = editedProposal.pricing.addOns.filter(addOn => addOn.selected);
    
    const packageTotal = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    
    return packageTotal + addOnTotal;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'reviewed': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Proposal Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`${getStatusColor(proposal.status)} font-medium`}
            >
              {proposal.status.toUpperCase()}
            </Badge>
            {proposal.requiresApproval && (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                <Shield className="w-3 h-3 mr-1" />
                Requires Approval
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Proposal Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{proposal.title}</h2>
            {isEditable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            )}
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Executive Summary</Label>
            {isEditing ? (
              <Textarea
                value={editedProposal.executiveSummary}
                onChange={(e) => setEditedProposal(prev => ({ ...prev, executiveSummary: e.target.value }))}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {proposal.executiveSummary}
              </p>
            )}
          </div>

          {/* Project Scope */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Project Scope</Label>
            {isEditing ? (
              <Textarea
                value={editedProposal.projectScope}
                onChange={(e) => setEditedProposal(prev => ({ ...prev, projectScope: e.target.value }))}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {proposal.projectScope}
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Deliverables */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Deliverables</Label>
          <div className="space-y-2">
            {proposal.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Pricing</Label>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${calculateTotal().toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
            </div>
          </div>

          {/* Package Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Package Options</Label>
            <div className="space-y-3">
              {editedProposal.pricing.packages.map((pkg) => (
                <div key={pkg.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={pkg.selected}
                          onChange={() => handlePackageToggle(pkg.id)}
                          className="w-4 h-4"
                        />
                      )}
                      <div>
                        <h4 className="font-medium">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${pkg.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pkg.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {editedProposal.pricing.addOns.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Add-ons</Label>
              <div className="space-y-2">
                {editedProposal.pricing.addOns.map((addOn) => (
                  <div key={addOn.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={addOn.selected}
                          onChange={() => handleAddOnToggle(addOn.id)}
                          className="w-4 h-4"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-sm">{addOn.name}</h4>
                        <p className="text-xs text-muted-foreground">{addOn.description}</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">${addOn.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Terms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Payment Terms</Label>
            {isEditing ? (
              <Input
                value={editedProposal.pricing.paymentTerms}
                onChange={(e) => setEditedProposal(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, paymentTerms: e.target.value }
                }))}
                placeholder="e.g., 50% upfront, 50% on completion"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{proposal.pricing.paymentTerms}</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Timeline */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Timeline</Label>
          {isEditing ? (
            <Input
              value={editedProposal.timeline}
              onChange={(e) => setEditedProposal(prev => ({ ...prev, timeline: e.target.value }))}
              placeholder="e.g., 4-6 weeks"
            />
          ) : (
            <p className="text-sm text-muted-foreground">{proposal.timeline}</p>
          )}
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Next Steps</Label>
          <div className="space-y-2">
            {proposal.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t border-border">
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onSend}>
                <Send className="w-4 h-4 mr-2" />
                Send Proposal
              </Button>
              <Button variant="outline" onClick={onDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          )}
          
          {proposal.requiresApproval && (
            <Button variant="outline" onClick={onRequestApproval} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Request Admin Approval
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
