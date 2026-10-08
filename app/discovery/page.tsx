"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2, PlayCircle } from "lucide-react";
import { toast } from "sonner";

const discoverySchema = z.object({
  country: z.string().min(1, "Country is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  service: z.string().min(1, "Service is required"),
  minScore: z.string().regex(/^\d+$/, "Must be a number"),
  intent: z.string().min(1, "Intent level is required"),
});

export default function DiscoveryPage() {
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof discoverySchema>>({
    resolver: zodResolver(discoverySchema),
    defaultValues: {
      country: "",
      industry: "",
      companySize: "",
      service: "",
      minScore: "75",
      intent: "",
    },
  });

  const onSubmit = (values: z.infer<typeof discoverySchema>) => {
    setIsDiscovering(true);
    setProgress(0);
    toast.info("Lead Discovery Initialized", {
      description: "Agents are scanning the web for target criteria...",
    });
    
    // Simulate multi-step discovery process
    const steps = [
      () => setProgress(1),
      () => setProgress(2),
      () => setProgress(3),
      () => setProgress(4),
      () => {
        setProgress(5);
        toast.success("Discovery Complete!", {
          description: "Found 14 qualified leads.",
        });
      }, // Completed
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
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Discovery</h1>
        <p className="text-muted-foreground mt-1">Configure criteria to discover new high-quality leads.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Discovery Parameters</CardTitle>
            <CardDescription>Set the target criteria for your ideal clients.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. USA" {...field} disabled={isDiscovering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. SaaS" {...field} disabled={isDiscovering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isDiscovering}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-500">201-500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="intent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Intent</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isDiscovering}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service to Sell</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Web Dev" {...field} disabled={isDiscovering} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Score</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} disabled={isDiscovering} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full mt-4" disabled={isDiscovering}>
                  {isDiscovering ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Discovering...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Find Clients
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isDiscovering && (
          <Card>
            <CardHeader>
              <CardTitle>Discovery Progress</CardTitle>
              <CardDescription>AI is searching for clients...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <ProgressItem step={0} currentStep={progress} label="Searching" />
                <ProgressItem step={1} currentStep={progress} label="Validating companies" />
                <ProgressItem step={2} currentStep={progress} label="Removing duplicates" />
                <ProgressItem step={3} currentStep={progress} label="Researching" />
                <ProgressItem step={4} currentStep={progress} label="Scoring" />
              </div>

              {progress === 5 && (
                <div className="mt-6 pt-6 border-t animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="font-semibold mb-4">Discovery Complete</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold">127</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Found</div>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold text-blue-500">24</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Qualified</div>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <div className="text-2xl font-bold text-orange-500">8</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Hot</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = '/leads'}>
                    View Leads
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
