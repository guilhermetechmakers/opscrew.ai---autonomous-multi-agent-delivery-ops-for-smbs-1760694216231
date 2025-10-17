import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileSignature, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Download
} from 'lucide-react';
import type { ESignDocument, ESignSigner } from '@/types';

interface ESignIntegrationProps {
  proposalId: string;
  onSendForSignature?: (signers: ESignSigner[]) => void;
  onCheckStatus?: (documentId: string) => void;
  onDownload?: (documentId: string) => void;
}

export function ESignIntegration({ 
  proposalId, 
  onSendForSignature, 
  onCheckStatus, 
  onDownload 
}: ESignIntegrationProps) {
  const [signers, setSigners] = useState<ESignSigner[]>([
    { id: '1', name: '', email: '', role: 'client', status: 'pending' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentStatus, setDocumentStatus] = useState<'draft' | 'sent' | 'signed' | 'declined' | 'expired'>('draft');

  const addSigner = () => {
    setSigners(prev => [...prev, { 
      id: (prev.length + 1).toString(), 
      name: '', 
      email: '', 
      role: 'client', 
      status: 'pending' 
    }]);
  };

  const removeSigner = (id: string) => {
    setSigners(prev => prev.filter(signer => signer.id !== id));
  };

  const updateSigner = (id: string, field: keyof ESignSigner, value: string) => {
    setSigners(prev => prev.map(signer => 
      signer.id === id ? { ...signer, [field]: value } : signer
    ));
  };

  const handleSendForSignature = async () => {
    const validSigners = signers.filter(s => s.name.trim() && s.email.trim());
    if (validSigners.length === 0) return;

    setIsLoading(true);
    try {
      await onSendForSignature?.(validSigners);
      setDocumentStatus('sent');
    } catch (error) {
      console.error('Error sending for signature:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'signed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'declined': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'expired': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileSignature className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <AlertCircle className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      default: return <FileSignature className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileSignature className="w-5 h-5" />
          E-Signature Integration
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Document Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(documentStatus)}
            <span className="font-medium">Document Status</span>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(documentStatus)} font-medium`}
          >
            {documentStatus.toUpperCase()}
          </Badge>
        </div>

        {/* Signers Configuration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Signers</Label>
            <Button variant="outline" size="sm" onClick={addSigner}>
              Add Signer
            </Button>
          </div>

          <div className="space-y-3">
            {signers.map((signer, index) => (
              <div key={signer.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-border rounded-lg">
                <div>
                  <Label htmlFor={`name-${signer.id}`} className="text-xs">Name</Label>
                  <Input
                    id={`name-${signer.id}`}
                    value={signer.name}
                    onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                    placeholder="Full name"
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor={`email-${signer.id}`} className="text-xs">Email</Label>
                  <Input
                    id={`email-${signer.id}`}
                    type="email"
                    value={signer.email}
                    onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                    placeholder="email@example.com"
                    className="h-8"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`role-${signer.id}`} className="text-xs">Role</Label>
                    <select
                      id={`role-${signer.id}`}
                      value={signer.role}
                      onChange={(e) => updateSigner(signer.id, 'role', e.target.value as any)}
                      className="w-full h-8 px-3 py-1 text-sm border border-input bg-background rounded-md"
                    >
                      <option value="client">Client</option>
                      <option value="approver">Approver</option>
                      <option value="witness">Witness</option>
                    </select>
                  </div>
                  {signers.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSigner(signer.id)}
                      className="h-8 w-8 p-0"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Integration Options</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileSignature className="w-6 h-6" />
              <span className="text-sm font-medium">DocuSign</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileSignature className="w-6 h-6" />
              <span className="text-sm font-medium">HelloSign</span>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-border">
          {documentStatus === 'draft' && (
            <Button 
              onClick={handleSendForSignature} 
              disabled={isLoading || signers.some(s => !s.name.trim() || !s.email.trim())}
              className="w-full"
            >
              {isLoading ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send for Signature
            </Button>
          )}

          {documentStatus === 'sent' && (
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Document
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          )}

          {documentStatus === 'signed' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle className="w-4 h-4" />
                Document has been signed by all parties
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Signed Document
              </Button>
            </div>
          )}
        </div>

        {/* Integration Status */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Integration Status</span>
          </div>
          <p className="text-xs text-muted-foreground">
            E-signature integration is currently in development. This is a placeholder interface for future DocuSign and HelloSign integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
