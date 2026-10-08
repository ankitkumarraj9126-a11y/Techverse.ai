export type LeadStatus = 'NEW' | 'QUALIFIED' | 'RESEARCHED' | 'OUTREACH_READY' | 'CONTACTED' | 'REPLIED' | 'MEETING' | 'PROPOSAL' | 'WON' | 'LOST';

export interface Company {
  name: string;
  website: string;
  country: string;
  industry: string;
  size: string;
  description: string;
  source: string;
}

export interface Contact {
  name: string;
  title: string;
  email: string;
  emailConfidence: number;
}

export interface LeadScore {
  total: number;
  label: 'HOT' | 'WARM' | 'COLD';
  breakdown: {
    buyingIntent: number;
    serviceMatch: number;
    companyQuality: number;
    budgetPotential: number;
    decisionMaker: number;
  };
  reasons: string[];
}

export interface LeadSignal {
  type: string;
  intent: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  evidence: string;
}

export interface Lead {
  id: string;
  company: Company;
  contact: Contact | null;
  score: LeadScore;
  signals: LeadSignal[];
  status: LeadStatus;
  recommendedService: string;
  updatedAt: string;
}
