/** Document entity — backend `documents` jadvaliga mos keladi. */
export interface Document {
  id: number;
  title: string;
  file_url: string;
  category: string | null;
  order: number;
  is_active: boolean;
}

export interface DocumentCreate {
  title: string;
  file_url: string;
  category?: string | null;
  order?: number;
  is_active?: boolean;
}

export interface DocumentUpdate {
  title?: string;
  file_url?: string;
  category?: string | null;
  order?: number;
  is_active?: boolean;
}
