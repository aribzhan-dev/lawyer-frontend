import type { Lawyer, LawyerCreate, LawyerUpdate } from '@/types/lawyer';
import apiClient from './apiClient';

export const lawyersApi = {
  getAll: (): Promise<Lawyer[]> =>
    apiClient.get<Lawyer[]>('/lawyers').then((r) => r.data),

  getAllAdmin: (): Promise<Lawyer[]> =>
    apiClient.get<Lawyer[]>('/lawyers/all').then((r) => r.data),

  getBySlug: (slug: string): Promise<Lawyer> =>
    apiClient.get<Lawyer>(`/lawyers/${slug}`).then((r) => r.data),

  create: (data: LawyerCreate): Promise<Lawyer> =>
    apiClient.post<Lawyer>('/lawyers', data).then((r) => r.data),

  update: (id: number, data: LawyerUpdate): Promise<Lawyer> =>
    apiClient.put<Lawyer>(`/lawyers/${id}`, data).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    apiClient.delete(`/lawyers/${id}`).then(() => undefined),
};
