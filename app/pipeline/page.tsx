"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { getMockLeads } from "@/lib/mocks/leads";

const columns = [
  "NEW",
  "QUALIFIED",
  "RESEARCHED",
  "OUTREACH READY",
  "CONTACTED",
  "REPLIED",
  "MEETING",
  "PROPOSAL",
  "WON",
  "LOST"
] as const;

export default function PipelinePage() {
  const { data: leads } = getMockLeads(1, 100);

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track leads through the acquisition lifecycle.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          <AlertCircle className="w-4 h-4" />
          Drag & Drop currently disabled pending API support
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => {
            // In a real app we'd map lead.status to the exact column enum
            const columnLeads = leads.filter(l => 
              l.status === column || 
              (column === 'OUTREACH READY' && l.status === 'OUTREACH_READY')
            );
            
            return (
              <div key={column} className="w-80 flex flex-col h-full bg-muted/30 rounded-lg border border-border/50">
                <div className="p-3 border-b flex justify-between items-center bg-muted/50 rounded-t-lg">
                  <h3 className="font-semibold text-sm">{column}</h3>
                  <Badge variant="secondary" className="font-normal text-xs">{columnLeads.length}</Badge>
                </div>
                
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnLeads.map(lead => (
                    <Card key={lead.id} className="cursor-not-allowed opacity-90 hover:opacity-100 transition-opacity">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm leading-none">{lead.company.name}</h4>
                          <Badge variant={lead.score.total >= 90 ? "destructive" : "secondary"} className={lead.score.total >= 90 ? "bg-orange-500/10 text-orange-600 border-0" : ""}>
                            {lead.score.total}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{lead.company.country}</span>
                          <span className="font-medium text-foreground truncate max-w-[120px]">{lead.recommendedService}</span>
                        </div>
                        
                        <div className="pt-3 border-t flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          Last activity: {new Date(lead.updatedAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {columnLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
