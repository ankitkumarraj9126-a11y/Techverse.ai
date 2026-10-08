"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and TechVerse AI preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Basic account and profile settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="Ankit" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="ankit@techverse.ai" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Preferences</CardTitle>
            <CardDescription>Configure how the AI agent qualifies leads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Minimum Score</Label>
              <Input type="number" defaultValue="80" />
            </div>
            <div className="space-y-2">
              <Label>Strict Validation</Label>
              <p className="text-sm text-muted-foreground mb-2">If enabled, the AI will automatically reject leads without a verifiable email address.</p>
              <Button variant="outline">Enabled</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outreach</CardTitle>
            <CardDescription>Manage sending limits and email templates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Daily Send Limit</Label>
              <Input type="number" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <Label>Auto-approval</Label>
              <p className="text-sm text-muted-foreground mb-2">Require manual approval for AI-generated drafts (Recommended).</p>
              <Button variant="secondary">Manual Approval Required</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect external tools and services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-md gap-4">
              <div>
                <h4 className="font-semibold">Hunter.io</h4>
                <p className="text-sm text-muted-foreground">Email discovery and verification.</p>
              </div>
              <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20 w-fit">Connected</Badge>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-md gap-4">
              <div>
                <h4 className="font-semibold">OpenAI</h4>
                <p className="text-sm text-muted-foreground">LLM for research and outreach drafting.</p>
              </div>
              <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20 w-fit">Connected</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Agent</CardTitle>
            <CardDescription>Settings for the TechVerse AI browser extension.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold">Extension Status</h4>
                <p className="text-sm text-muted-foreground">Link your browser extension to this workspace.</p>
              </div>
              <Button variant="outline">Generate Sync Token</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
