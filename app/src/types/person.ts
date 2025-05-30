export interface Company {
  id: number;
  name: string;
}

export interface Person {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  companyId?: number;
  Companies?: Company;
}

export interface PersonWithId extends Person {
  id: number;
} 