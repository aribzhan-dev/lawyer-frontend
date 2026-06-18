export function getFileUrl(fileUrl: string | undefined): string {
  if (!fileUrl) return '';
  if (fileUrl.startsWith("http")) return fileUrl;
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  try {
    const url = new URL(backendUrl);

    return `${url.origin}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
  } catch (e) {
    return `http://localhost:8000${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
  }
}
