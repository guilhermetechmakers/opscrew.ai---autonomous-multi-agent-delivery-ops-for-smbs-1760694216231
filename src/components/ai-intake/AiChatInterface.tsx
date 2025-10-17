import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { ChatMessage } from '@/types';

interface AiChatInterfaceProps {
  conversationId?: string;
  onLeadExtracted?: (leadData: any) => void;
  onConversationComplete?: () => void;
}

export function AiChatInterface({ 
  conversationId, 
  onLeadExtracted, 
  onConversationComplete 
}: AiChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      role: 'assistant',
      content: "Hello! I'm your AI Intake Agent. I'm here to help understand your project needs and qualify you for our services. What kind of project are you looking to build?",
      timestamp: new Date().toISOString(),
      metadata: {
        suggestedReplies: [
          "I need a web application",
          "I want to build a mobile app",
          "I need help with my existing project",
          "I'm not sure yet, can you help me figure it out?"
        ]
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response with typing effect
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: generateMockResponse(messageToSend),
        timestamp: new Date().toISOString(),
        metadata: {
          suggestedReplies: generateSuggestedReplies(messageToSend),
          confidence: 0.85
        }
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsTyping(false);

      // Check if conversation is complete
      if (shouldExtractLead(messageToSend)) {
        setTimeout(() => {
          onLeadExtracted?.(extractMockLeadData());
          onConversationComplete?.();
        }, 1000);
      }
    }, 1500);
  };

  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
      return "Great! A web application is a perfect choice. Can you tell me more about the specific features you need? For example, do you need user authentication, payment processing, or any specific integrations?";
    } else if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
      return "Excellent! Mobile apps are very popular. Are you thinking iOS, Android, or both? Also, what's the main purpose of your app - is it for e-commerce, social networking, productivity, or something else?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('existing')) {
      return "I'd be happy to help with your existing project! What challenges are you currently facing? Are you looking to add new features, fix bugs, improve performance, or something else?";
    } else if (lowerMessage.includes('not sure') || lowerMessage.includes('figure out')) {
      return "No worries at all! Let's start with the basics. What's your business or project about? What problem are you trying to solve for your customers? This will help me understand what type of solution would work best.";
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Budget is definitely an important factor! We have different packages to fit various budgets. Could you give me a rough range you're thinking? For example, under $25k, $25k-$50k, $50k-$100k, or over $100k?";
    } else if (lowerMessage.includes('timeline') || lowerMessage.includes('when') || lowerMessage.includes('deadline')) {
      return "Timeline is crucial for planning! When are you hoping to have this project completed? Are you looking at a few weeks, a few months, or do you have a specific deadline in mind?";
    } else {
      return "That's very interesting! Can you tell me more about your specific requirements? The more details you can share, the better I can understand how to help you.";
    }
  };

  const generateSuggestedReplies = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
      return [
        "I need user authentication",
        "Payment processing is important",
        "I need specific integrations",
        "I'm not sure about features yet"
      ];
    } else if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
      return [
        "Both iOS and Android",
        "Just iOS for now",
        "Just Android for now",
        "I'm not sure yet"
      ];
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
      return [
        "Under $25,000",
        "$25,000 - $50,000",
        "$50,000 - $100,000",
        "Over $100,000"
      ];
    } else {
      return [
        "Tell me more about pricing",
        "What's the typical timeline?",
        "Can you show me examples?",
        "I need to think about it"
      ];
    }
  };

  const shouldExtractLead = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return lowerMessage.includes('budget') && 
           lowerMessage.includes('timeline') && 
           (lowerMessage.includes('$') || lowerMessage.includes('thousand') || lowerMessage.includes('k'));
  };

  const extractMockLeadData = () => ({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'TechStart Inc.',
    projectType: 'Web Application',
    budgetRange: '$50,000 - $100,000',
    timeline: '3-6 months',
    qualificationScore: 85
  });

  const handleSuggestedReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-semibold">AI Intake Agent</div>
              <div className="text-sm text-muted-foreground font-normal">
                {isTyping ? 'Typing...' : 'Online'}
              </div>
            </div>
          </div>
          {isTyping && (
            <div className="ml-auto">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.role === 'user' && (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.metadata?.confidence && (
                        <div className="flex items-center gap-1 mt-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs opacity-70">
                            Confidence: {Math.round(message.metadata.confidence * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Suggested Replies */}
                  {message.role === 'assistant' && message.metadata?.suggestedReplies && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs opacity-70 mb-2">Suggested replies:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.metadata.suggestedReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestedReply(reply)}
                            disabled={isLoading}
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
