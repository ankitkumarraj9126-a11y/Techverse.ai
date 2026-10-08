import { Lead } from "@/types";

export const mockLeads: Lead[] = [
  {
    id: "lead_1",
    company: {
      name: "ABC SaaS",
      website: "https://abcsaas.example.com",
      country: "USA",
      industry: "SaaS",
      size: "50-200",
      description: "Fast-growing B2B SaaS platform for HR.",
      source: "Manual",
    },
    contact: {
      name: "John Smith",
      title: "Founder",
      email: "john@abcsaas.example.com",
      emailConfidence: 94,
    },
    score: {
      total: 96,
      label: "HOT",
      breakdown: {
        buyingIntent: 90,
        serviceMatch: 100,
        companyQuality: 95,
        budgetPotential: 90,
        decisionMaker: 100,
      },
      reasons: ["Recently funded", "Website needs improvement", "Hiring developers", "Strong service match"],
    },
    signals: [
      {
        type: "HIRING",
        intent: "HIGH",
        title: "Recently funded",
        description: "Raised Series A",
        evidence: "TechCrunch article",
      },
      {
        type: "WEBSITE_OPPORTUNITY",
        intent: "HIGH",
        title: "Mobile UX issues detected",
        description: "Lighthouse score 45 on mobile",
        evidence: "Automated audit",
      }
    ],
    status: "QUALIFIED",
    recommendedService: "Website Redesign",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lead_2",
    company: {
      name: "XYZ AI",
      website: "https://xyzai.example.com",
      country: "UK",
      industry: "Artificial Intelligence",
      size: "10-50",
      description: "AI solutions for retail.",
      source: "Discovery Job #42",
    },
    contact: null,
    score: {
      total: 93,
      label: "HOT",
      breakdown: {
        buyingIntent: 85,
        serviceMatch: 95,
        companyQuality: 90,
        budgetPotential: 95,
        decisionMaker: 100,
      },
      reasons: ["Strong service match", "Expanding team"],
    },
    signals: [],
    status: "NEW",
    recommendedService: "AI Automation",
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "lead_3",
    company: {
      name: "SolarTech",
      website: "https://solartech.example.com",
      country: "UAE",
      industry: "Energy",
      size: "200-500",
      description: "Leading solar panel manufacturer.",
      source: "Manual",
    },
    contact: null,
    score: {
      total: 75,
      label: "WARM",
      breakdown: {
        buyingIntent: 60,
        serviceMatch: 80,
        companyQuality: 90,
        budgetPotential: 85,
        decisionMaker: 60,
      },
      reasons: ["Outdated tech stack"],
    },
    signals: [],
    status: "RESEARCHED",
    recommendedService: "Web App",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export function getMockLeads(page = 1, limit = 25, search?: string) {
  let filtered = mockLeads;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(l => l.company.name.toLowerCase().includes(s) || l.company.industry.toLowerCase().includes(s));
  }
  
  const start = (page - 1) * limit;
  return {
    data: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    limit,
  };
}

export function getMockLead(id: string) {
  return mockLeads.find(l => l.id === id) || null;
}
