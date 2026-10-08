"use client";

import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Globe, MapPin, Building, Link as LinkIcon, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMockLead } from "@/lib/mocks/leads";

function LeadDetailContent() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data: lead, isLoading, isError } = useQuery({
    queryKey: ["lead", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockLead(id);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="p-8 max-w-6xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Lead not found</h2>
        <p className="text-muted-foreground">The lead you are looking for does not exist or an error occurred.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/leads")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            {lead.company.name}
            <Badge variant="outline" className="text-sm font-normal">{lead.status}</Badge>
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {lead.company.website}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {lead.company.country}</span>
            <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {lead.company.industry}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Company Section */}
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{lead.company.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block">Size</span>
                  <span className="font-medium">{lead.company.size} employees</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Source</span>
                  <span className="font-medium">{lead.company.source}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signals */}
          <Card>
            <CardHeader>
              <CardTitle>Business Signals</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.signals.length === 0 ? (
                <p className="text-muted-foreground text-sm">No signals detected yet.</p>
              ) : (
                <div className="space-y-4">
                  {lead.signals.map((signal, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border rounded-md bg-muted/20">
                      {signal.intent === 'HIGH' ? (
                        <div className="p-2 bg-orange-500/20 rounded-full"><ShieldAlert className="w-5 h-5 text-orange-600" /></div>
                      ) : (
                        <div className="p-2 bg-blue-500/20 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm">{signal.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{signal.description}</p>
                        <p className="text-xs text-muted-foreground mt-2 border-t pt-2">Evidence: {signal.evidence}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Score Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Lead Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{lead.score.total}</span>
                <span className="text-muted-foreground">/100</span>
                <Badge variant={lead.score.label === 'HOT' ? "destructive" : "secondary"} className="ml-auto">
                  {lead.score.label}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Buying Intent</span>
                  <span className="font-medium">{lead.score.breakdown.buyingIntent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Match</span>
                  <span className="font-medium">{lead.score.breakdown.serviceMatch}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Company Quality</span>
                  <span className="font-medium">{lead.score.breakdown.companyQuality}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2">Why this score?</h4>
                <ul className="space-y-1">
                  {lead.score.reasons.map((reason, i) => (
                    <li key={i} className="text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Decision maker info</CardDescription>
            </CardHeader>
            <CardContent>
              {lead.contact ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium block">{lead.contact.name}</span>
                    <span className="text-xs text-muted-foreground">{lead.contact.title}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium block">{lead.contact.email}</span>
                    <span className="text-xs text-muted-foreground">{lead.contact.emailConfidence}% confidence</span>
                  </div>
                  <Button className="w-full mt-2" variant="outline">Copy Email</Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No contact information available.</p>
              )}
            </CardContent>
          </Card>

          {/* Action Section */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Recommended Service</span>
                <Badge variant="secondary" className="w-full justify-center">{lead.recommendedService}</Badge>
              </div>
              <Button className="w-full">Start Outreach</Button>
              <Button className="w-full" variant="outline">Run Website Audit</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LeadDetailPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <LeadDetailContent />
    </Suspense>
  );
}
