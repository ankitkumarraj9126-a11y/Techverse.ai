"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Loader2, PlayCircle, Globe, MonitorSmartphone, Accessibility, SearchCode, Zap, Target, AlertCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const auditSchema = z.object({
  website: z.string().url("Must be a valid URL (e.g., https://example.com)"),
});

export default function AuditsPage() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof auditSchema>>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof auditSchema>) => {
    setIsAuditing(true);
    setProgress(0);
    
    const steps = [
      () => setProgress(1),
      () => setProgress(2),
      () => setProgress(3),
      () => setProgress(4),
      () => setProgress(5),
      () => setProgress(6), // Completed
    ];

    steps.forEach((step, index) => {
      setTimeout(step, (index + 1) * 1200);
    });
  };

  const ProgressItem = ({ step, currentStep, label }: { step: number, currentStep: number, label: string }) => {
    if (currentStep > step) {
      return (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle2 className="w-4 h-4" />
          <span>{label}</span>
        </div>
      );
    }
    if (currentStep === step) {
      return (
        <div className="flex items-center gap-2 text-primary font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{label}...</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-4 h-4 rounded-full border" />
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Website Audit</h1>
        <p className="text-muted-foreground mt-1">Run an automated diagnostic on a prospect&apos;s website.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Audit Target</CardTitle>
            <CardDescription>Enter the website URL to scan for issues and opportunities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} disabled={isAuditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4" disabled={isAuditing}>
                  {isAuditing && progress < 6 ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Analyze Website
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isAuditing && progress < 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Audit Progress</CardTitle>
              <CardDescription>Scanning website performance and structure...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressItem step={0} currentStep={progress} label="Connecting to server" />
              <ProgressItem step={1} currentStep={progress} label="Analyzing performance" />
              <ProgressItem step={2} currentStep={progress} label="Checking mobile UX" />
              <ProgressItem step={3} currentStep={progress} label="Evaluating SEO tags" />
              <ProgressItem step={4} currentStep={progress} label="Testing accessibility" />
              <ProgressItem step={5} currentStep={progress} label="Generating final score" />
            </CardContent>
          </Card>
        )}
      </div>

      {progress === 6 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Overall Score */}
            <Card className="md:col-span-1 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * 64) / 100} className="text-orange-500" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-bold">64</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge variant="destructive" className="mt-6 bg-orange-500/10 text-orange-600 border-0 hover:bg-orange-500/20">Needs Improvement</Badge>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-500" /> Performance</span>
                    <span className="font-medium text-orange-500">45/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[45%]" /></div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><MonitorSmartphone className="w-4 h-4 text-yellow-500" /> Mobile UX</span>
                    <span className="font-medium text-yellow-500">58/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[58%]" /></div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><SearchCode className="w-4 h-4 text-green-500" /> SEO</span>
                    <span className="font-medium text-green-500">82/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[82%]" /></div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><Accessibility className="w-4 h-4 text-orange-500" /> Accessibility</span>
                    <span className="font-medium text-orange-500">51/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[51%]" /></div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-green-500" /> Design UI</span>
                    <span className="font-medium text-green-500">88/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[88%]" /></div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><Target className="w-4 h-4 text-yellow-500" /> Conversion</span>
                    <span className="font-medium text-yellow-500">60/100</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[60%]" /></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-500/20">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <CardTitle>Website Problems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-red-500 mb-2">Critical Issues</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Poor mobile navigation (touch targets too small)</li>
                    <li>• Slow hero image load (LCP is 4.2s)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-orange-500 mb-2">Warnings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Weak CTA (low contrast on primary buttons)</li>
                    <li>• Missing alt text on 12 images</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Lightbulb className="w-5 h-5 text-green-600" />
                <CardTitle>Recommended Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Based on the audit, the following services are the best fit for outreach.</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <span className="font-medium">Performance Optimization</span>
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-0">High Match</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <span className="font-medium">Mobile UX Redesign</span>
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-0">High Match</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <span className="font-medium">Conversion Rate Optimization</span>
                    <Badge variant="secondary">Medium Match</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button>Generate Pitch</Button>
          </div>
        </div>
      )}
    </div>
  );
}
