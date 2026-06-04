import type { Service, ServiceCreate, ServiceUpdate } from '@/types/service';
import apiClient from './apiClient';

export const servicesApi = {
  getTree: (): Promise<Service[]> =>
    apiClient.get<Service[]>('/services/tree').then((r) => r.data),

  getFlat: (): Promise<Service[]> =>
    apiClient.get<Service[]>('/services/flat').then((r) => r.data),

  getById: (id: number): Promise<Service> =>
    apiClient.get<Service>(`/services/${id}`).then((r) => r.data),

  create: (data: ServiceCreate): Promise<Service> =>
    apiClient.post<Service>('/services', data).then((r) => r.data),

  update: (id: number, data: ServiceUpdate): Promise<Service> =>
    apiClient.put<Service>(`/services/${id}`, data).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    apiClient.delete(`/services/${id}`).then(() => undefined),
};
