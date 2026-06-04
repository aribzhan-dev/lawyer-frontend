export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order: number;
  parent_id: number | null;
  children: Service[];
}

export interface ServiceCreate {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  parent_id?: number | null;
}

export interface ServiceUpdate extends Partial<ServiceCreate> {}
