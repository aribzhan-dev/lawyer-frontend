import type { Service } from './service';

export interface Lawyer {
  id: number;
  full_name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  experience_years: number | null;
  education: string | null;
  photo_url: string | null;
  phone: string;
  whatsapp_message: string | null;
  is_active: boolean;
  order: number;
  services: Service[];
}

export interface LawyerCreate {
  full_name: string;
  slug: string;
  title?: string;
  bio?: string;
  experience_years?: number;
  education?: string;
  photo_url?: string;
  phone: string;
  whatsapp_message?: string;
  is_active?: boolean;
  order?: number;
  service_ids?: number[];
}

export interface LawyerUpdate extends Partial<LawyerCreate> {}
