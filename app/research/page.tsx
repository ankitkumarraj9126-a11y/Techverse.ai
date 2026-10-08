"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Loader2, PlayCircle, Globe, Briefcase, Target, ShieldAlert, AlertTriangle, Lightbulb, CheckSquare, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const researchSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  website: z.string().url("Must be a valid URL"),
});

export default function ResearchPage() {
  const [isResearching, setIsResearching] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof researchSchema>>({
    resolver: zodResolver(researchSchema),
    defaultValues: {
      company: "",
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof researchSchema>) => {
    setIsResearching(true);
    setProgress(0);
    
    const steps = [
      () => setProgress(1),
      () => setProgress(2),
      () => setProgress(3),
      () => setProgress(4),
      () => setProgress(5), // Completed
    ];

    steps.forEach((step, index) => {
      setTimeout(step, (index + 1) * 1500);
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
        <h1 className="text-3xl font-bold tracking-tight">Company Research</h1>
        <p className="text-muted-foreground mt-1">Generate deep insights and opportunity reports for a specific company.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Research Target</CardTitle>
            <CardDescription>Enter company details to start the research agent.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Acme Corp" {...field} disabled={isResearching} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} disabled={isResearching} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4" disabled={isResearching}>
                  {isResearching && progress < 5 ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Researching...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Research
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isResearching && progress < 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Research Progress</CardTitle>
              <CardDescription>Agent is gathering information...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressItem step={0} currentStep={progress} label="Company identified" />
              <ProgressItem step={1} currentStep={progress} label="Website analyzed" />
              <ProgressItem step={2} currentStep={progress} label="Business model analyzed" />
              <ProgressItem step={3} currentStep={progress} label="Signals detected" />
              <ProgressItem step={4} currentStep={progress} label="Generating opportunity report" />
            </CardContent>
          </Card>
        )}
      </div>

      {progress === 5 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold border-b pb-2">Research Report</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Briefcase className="w-5 h-5 text-primary" />
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Acme Corp is a leading provider of cloud-based inventory management solutions for mid-sized retail businesses. They focus on automation and real-time syncing across multiple warehouses.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Globe className="w-5 h-5 text-primary" />
                <CardTitle>Business Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">B2B SaaS. Subscription-based pricing with tiered plans based on the number of SKUs and warehouses. Enterprise plans include dedicated support and API access.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle>Target Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Mid-market retail and e-commerce companies ($5M-$50M ARR) struggling with multi-channel inventory tracking.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <CardTitle>Detected Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/> Hiring Lead Frontend Engineer</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/> Recently expanded to UK market</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/> Launched new mobile app</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <CardTitle>Potential Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• High bounce rate on mobile landing pages</li>
                  <li>• No clear CTA on the pricing page</li>
                  <li>• Outdated case studies (last updated 2023)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <CardTitle>Potential Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Mobile-first redesign for better conversion</li>
                  <li>• Implement AI-driven chatbot for enterprise leads</li>
                  <li>• Improve SEO structure for UK market expansion</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <CheckSquare className="w-5 h-5 text-primary" />
              <CardTitle>Recommendation & Confidence</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Recommended Services to Pitch</h4>
                <div className="flex gap-2">
                  <Badge>Website Redesign</Badge>
                  <Badge variant="secondary">Conversion Rate Optimization</Badge>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm text-muted-foreground mb-1">AI Confidence Score</div>
                <div className="text-3xl font-bold text-green-500">92%</div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
             <Button variant="outline">Save to Leads</Button>
             <Button>Generate Outreach Draft</Button>
          </div>
        </div>
      )}
    </div>
  );
}
