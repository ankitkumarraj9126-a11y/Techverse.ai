"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Copy, CheckCircle2, XCircle, Search, Clock, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const mockDrafts = [
  {
    id: "1",
    company: "ABC SaaS",
    score: 96,
    service: "Website Redesign",
    signals: ["Mobile UX issues detected", "Recently funded"],
    message: "Hi John,\n\nI noticed ABC SaaS recently secured new funding—congratulations! While looking through your site, I loved the product offering but noticed some mobile UX friction that might be impacting conversions on smaller devices.\n\nWe specialize in Website Redesigns for B2B SaaS companies and recently helped XYZ Corp increase mobile conversions by 35%.\n\nAre you open to a quick 10-minute chat next week to share some specific ideas for your mobile checkout flow?\n\nBest,\nTechVerse AI Team",
    status: "Review",
    time: "10 mins ago"
  },
  {
    id: "2",
    company: "XYZ AI",
    score: 93,
    service: "AI Automation",
    signals: ["Hiring React developers"],
    message: "Hi Sarah,\n\nI saw XYZ AI is expanding the engineering team and hiring React developers. As you scale, internal processes often become a bottleneck.\n\nWe build custom AI Automations that integrate directly with your tech stack to streamline onboarding and internal support tickets.\n\nWould you be interested in a brief call to see how we saved Acme Inc 40 hours a week in dev time?\n\nCheers,\nTechVerse AI Team",
    status: "Review",
    time: "2 hours ago"
  }
];

export default function OutreachPage() {
  const [selectedDraftId, setSelectedDraftId] = useState(mockDrafts[0].id);
  const [message, setMessage] = useState(mockDrafts[0].message);
  
  const selectedDraft = mockDrafts.find(d => d.id === selectedDraftId);

  const handleSelect = (id: string) => {
    setSelectedDraftId(id);
    const draft = mockDrafts.find(d => d.id === id);
    if (draft) setMessage(draft.message);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Outreach & Approval</h1>
        <p className="text-muted-foreground mt-1">Review, edit, and approve AI-generated outreach drafts.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {/* Drafts List */}
        <Card className="flex flex-col border-r h-[400px] md:h-full overflow-hidden">
          <div className="p-4 border-b space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search drafts..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Needs Review (2)</Badge>
              <Badge variant="outline">Approved (14)</Badge>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {mockDrafts.map((draft) => (
              <div 
                key={draft.id} 
                onClick={() => handleSelect(draft.id)}
                className={`p-4 rounded-lg cursor-pointer border transition-colors ${selectedDraftId === draft.id ? 'bg-primary/10 border-primary/30' : 'bg-card hover:bg-muted/50 border-transparent'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{draft.company}</h3>
                  <Badge variant={draft.score >= 90 ? "destructive" : "secondary"} className={draft.score >= 90 ? "bg-orange-500/10 text-orange-600 border-0" : ""}>
                    {draft.score}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{draft.message}</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <Badge variant="outline" className="text-xs font-normal">{draft.service}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {draft.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Editor Pane */}
        {selectedDraft && (
          <div className="md:col-span-2 flex flex-col gap-4 h-full overflow-hidden mt-4 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Context</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Company:</span>
                    <span className="text-sm">{selectedDraft.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Pitching:</span>
                    <span className="text-sm">{selectedDraft.service}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Signals Detected</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-1">
                    {selectedDraft.signals.map((sig, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-orange-500" />
                        {sig}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardHeader className="py-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle>Message Editor</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Sparkles className="w-4 h-4 mr-2 text-primary" /> Regenerate</Button>
                    <Button variant="outline" size="sm">Improve</Button>
                    <Button variant="outline" size="sm">Shorten</Button>
                    <Button variant="outline" size="sm">Casual</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-full min-h-0 border-0 rounded-none focus-visible:ring-0 resize-none p-6 text-base leading-relaxed"
                />
              </CardContent>
              <div className="p-4 border-t bg-muted/10 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText(message);
                    toast.success("Draft copied to clipboard!");
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => toast.error("Draft rejected. AI will not contact this lead.")}
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Reject Draft
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast.success("Draft approved! Adding to send queue.");
                      // Here you would trigger an API call to send
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve & Prepare to Send
                  </Button>
                </div>
              </div>
            </Card>
            
            <p className="text-center text-xs text-muted-foreground">
              Approval confirms the message for manual sending. AI does not automatically send messages without permission.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
