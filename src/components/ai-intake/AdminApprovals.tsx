import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  FileText
} from 'lucide-react';
import type { AdminApproval } from '@/types';

interface AdminApprovalsProps {
  approvals: AdminApproval[];
  onApprove?: (approvalId: string, comments?: string) => void;
  onReject?: (approvalId: string, reason: string) => void;
  isAdmin?: boolean;
}

export function AdminApprovals({ 
  approvals, 
  onApprove, 
  onReject, 
  isAdmin = false 
}: AdminApprovalsProps) {
  const [selectedApproval, setSelectedApproval] = useState<AdminApproval | null>(null);
  const [comments, setComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = () => {
    if (selectedApproval) {
      onApprove?.(selectedApproval.id, comments);
      setSelectedApproval(null);
      setComments('');
    }
  };

  const handleReject = () => {
    if (selectedApproval && rejectionReason.trim()) {
      onReject?.(selectedApproval.id, rejectionReason);
      setSelectedApproval(null);
      setRejectionReason('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Admin Approvals
          {approvals.filter(a => a.status === 'pending').length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {approvals.filter(a => a.status === 'pending').length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {approvals.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No approval requests found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvals.map((approval) => (
              <div
                key={approval.id}
                className={`border border-border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedApproval?.id === approval.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedApproval(approval)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(approval.status)}
                    <span className="font-medium">Proposal #{approval.proposalId}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(approval.status)} font-medium`}
                  >
                    {approval.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Requested by: {approval.requestedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Requested: {formatDate(approval.requestedAt)}</span>
                  </div>
                  {approval.reason && (
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 mt-0.5" />
                      <span>{approval.reason}</span>
                    </div>
                  )}
                  {approval.reviewedBy && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Reviewed by: {approval.reviewedBy}</span>
                    </div>
                  )}
                  {approval.reviewedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Reviewed: {formatDate(approval.reviewedAt)}</span>
                    </div>
                  )}
                </div>

                {approval.comments && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium">Comments:</span>
                        <p className="text-sm text-muted-foreground mt-1">{approval.comments}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Approval Actions Modal */}
        {selectedApproval && selectedApproval.status === 'pending' && isAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Review Proposal #{selectedApproval.proposalId}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Request Details</Label>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <p><strong>Requested by:</strong> {selectedApproval.requestedBy}</p>
                    <p><strong>Date:</strong> {formatDate(selectedApproval.requestedAt)}</p>
                    {selectedApproval.reason && (
                      <p><strong>Reason:</strong> {selectedApproval.reason}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any comments about your decision..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rejection-reason">Rejection Reason (if rejecting)</Label>
                  <Textarea
                    id="rejection-reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Explain why this proposal is being rejected..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleApprove}
                    className="flex-1"
                    disabled={!comments.trim() && !rejectionReason.trim()}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    className="flex-1"
                    disabled={!rejectionReason.trim()}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedApproval(null);
                      setComments('');
                      setRejectionReason('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
