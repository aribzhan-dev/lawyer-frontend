/**
 * Backend qaytargan fayl yo'lini brauzer ocha oladigan URL ga aylantiradi.
 *
 * - To'liq URL (http/https) bo'lsa — o'zgartirmasdan qaytaramiz.
 * - `VITE_BACKEND_URL` berilgan bo'lsa (masalan, dev'da http://localhost:8000)
 *   — fayl yo'lini shu host'ga ulaymiz.
 * - Aks holda nisbiy yo'lni qaytaramiz: prod'da fayllar (`/uploads/...`)
 *   bir xil origin'dan (nginx) beriladi, shuning uchun host kerak emas.
 */
export function getFileUrl(fileUrl: string | undefined): string {
  if (!fileUrl) return '';
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }

  const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');

  return backendUrl ? `${backendUrl}${path}` : path;
}
