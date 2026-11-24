export type LeadStatus = "new" | "contacted" | "converted";

export interface Note {
  _id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: LeadStatus;
  notes: Note[];
  createdAt: string;
}
