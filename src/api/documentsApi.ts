import type { Document, DocumentCreate, DocumentUpdate } from '@/types/document';
import apiClient from './apiClient';

export const documentsApi = {
  /** Public: faqat aktiv hujjatlarni qaytaradi. */
  getAll: (): Promise<Document[]> =>
    apiClient.get<Document[]>('/documents').then((r) => r.data),

  /** Admin: barcha hujjatlarni (aktiv + noaktiv) qaytaradi. */
  getAllAdmin: (): Promise<Document[]> =>
    apiClient.get<Document[]>('/documents/all').then((r) => r.data),

  /** Admin: yangi hujjat yaratish. */
  create: (data: DocumentCreate): Promise<Document> =>
    apiClient.post<Document>('/documents', data).then((r) => r.data),

  /** Admin: mavjud hujjatni yangilash. */
  update: (id: number, data: DocumentUpdate): Promise<Document> =>
    apiClient.put<Document>(`/documents/${id}`, data).then((r) => r.data),

  /** Admin: hujjatni o'chirish. */
  delete: (id: number): Promise<void> =>
    apiClient.delete(`/documents/${id}`).then(() => undefined),
};
