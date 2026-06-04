import apiClient from './apiClient';

export interface UploadResponse {
  img_path: string;
}

export const uploadsApi = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // We don't set Content-Type header manually, let the browser set it with the boundary for multipart/form-data
    const { data } = await apiClient.post<UploadResponse>('/uploads/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return data.img_path;
  },
};
