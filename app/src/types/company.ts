export interface Company {
  id?: number;
  name: string;
  website?: string;
  headquarters?: string;
  status?: string;
  peopleCount?: number;
}

export interface CompanyWithId extends Company {
  id: number;
} 