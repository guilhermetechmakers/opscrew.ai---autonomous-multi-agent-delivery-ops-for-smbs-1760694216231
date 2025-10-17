import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  DollarSign, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Package,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import type { LeadSummary, PackageRecommendation } from '@/types';

interface LeadSummaryCardProps {
  lead: LeadSummary;
  onEdit?: () => void;
  onGenerateProposal?: () => void;
  onSaveLead?: () => void;
  onCreateProject?: () => void;
}

export function LeadSummaryCard({ 
  lead, 
  onEdit, 
  onGenerateProposal, 
  onSaveLead, 
  onCreateProject 
}: LeadSummaryCardProps) {
  const getQualificationColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualificationLabel = (score: number) => {
    if (score >= 80) return 'Highly Qualified';
    if (score >= 60) return 'Qualified';
    return 'Needs Qualification';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Lead Summary
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${getUrgencyColor(lead.urgency)} font-medium`}
          >
            {lead.urgency.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lead Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{lead.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lead.email}</span>
              </div>
              {lead.company && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{lead.company}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{lead.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lead.projectType}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lead.budgetRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lead.timeline}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Qualification Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getQualificationColor(lead.qualificationScore)}`}>
                {lead.qualificationScore}%
              </span>
              <Badge variant="outline" className={getQualificationColor(lead.qualificationScore)}>
                {getQualificationLabel(lead.qualificationScore)}
              </Badge>
            </div>
          </div>
          <Progress value={lead.qualificationScore} className="h-2" />
        </div>

        {/* Recommended Packages */}
        {lead.recommendedPackages && lead.recommendedPackages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="font-medium">Recommended Packages</span>
            </div>
            <div className="space-y-2">
              {lead.recommendedPackages.map((pkg, index) => (
                <div key={pkg.id} className="p-3 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{pkg.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(pkg.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      ${pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">{pkg.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extracted Requirements */}
        {lead.extractedRequirements && lead.extractedRequirements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Key Requirements</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lead.extractedRequirements.map((requirement, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {requirement}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Pain Points */}
        {lead.painPoints && lead.painPoints.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Pain Points</span>
            </div>
            <div className="space-y-1">
              {lead.painPoints.map((painPoint, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {painPoint}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decision Makers */}
        {lead.decisionMakers && lead.decisionMakers.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Decision Makers</span>
            </div>
            <div className="space-y-1">
              {lead.decisionMakers.map((maker, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {maker}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t border-border">
          <Button onClick={onGenerateProposal} className="w-full">
            <Package className="w-4 h-4 mr-2" />
            Generate Proposal
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={onSaveLead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Lead
            </Button>
            <Button variant="outline" onClick={onCreateProject}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit} className="w-full">
              Edit Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
