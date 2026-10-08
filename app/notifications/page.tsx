"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellRing, ShieldAlert, CheckCircle2, MessageCircle, Calendar, XCircle, SearchCode } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "New hot lead",
    message: "ABC SaaS scored 96/100 and matches your ideal customer profile.",
    time: "2 mins ago",
    icon: ShieldAlert,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    unread: true
  },
  {
    id: 2,
    type: "Meeting opportunity",
    message: "Sarah from XYZ AI replied positively to your outreach.",
    time: "1 hour ago",
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    unread: true
  },
  {
    id: 3,
    type: "Research completed",
    message: "Deep research completed for SolarTech.",
    time: "3 hours ago",
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    unread: false
  },
  {
    id: 4,
    type: "Outreach ready",
    message: "AI has generated 4 new outreach drafts requiring your approval.",
    time: "5 hours ago",
    icon: MessageCircle,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    unread: false
  },
  {
    id: 5,
    type: "Website audit completed",
    message: "Acme Corp scored 64/100. Critical mobile UX issues detected.",
    time: "Yesterday",
    icon: SearchCode,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    unread: false
  },
  {
    id: 6,
    type: "Job failed",
    message: "Failed to scrape pricing page for Competitor Inc. Paywall detected.",
    time: "Yesterday",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    unread: false
  }
];

export default function NotificationsPage() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your client acquisition activities.</p>
        </div>
        <Button variant="outline"><BellRing className="w-4 h-4 mr-2" /> Mark all as read</Button>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockNotifications.map((notif) => (
              <div key={notif.id} className={`p-4 flex gap-4 transition-colors hover:bg-muted/50 ${notif.unread ? 'bg-primary/5' : ''}`}>
                <div className={`p-2 rounded-full h-fit ${notif.bg}`}>
                  <notif.icon className={`w-5 h-5 ${notif.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{notif.type}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{notif.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                </div>
                {notif.unread && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
