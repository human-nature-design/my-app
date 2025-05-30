export interface Opportunity {
  name: string;
  "dollar amount": number;
  companyId: number;
  "close date": string | null;
  status: string;
  progress?: number;
  company_avatar?: string;
  Companies?: {
    id: number;
    name: string;
    website?: string;
    headquarters?: string;
    status?: string;
  };
  created_at?: string;
}

export interface OpportunityWithId extends Opportunity {
  id: number;
} 