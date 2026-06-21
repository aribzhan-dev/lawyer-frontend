// Kompaniya bog'lanish ma'lumotlari — bitta joyda saqlanadi (DRY).
// O'zgartirish kerak bo'lsa faqat shu faylni tahrirlash kifoya.

export interface PhoneContact {
  /** Ekranda ko'rsatiladigan format */
  display: string;
  /** tel: havolasi uchun raqam */
  href: string;
}

export const COMPANY_ADDRESS =
  'РК. г. Шымкент, Каратауский район, жилой массив Сайрам, ул. Амир Темир, дом№ 237/9, 2- этаж, 2-каб';

/** Manzilni bosganda 2GIS'da ochiladi */
export const COMPANY_ADDRESS_MAP_URL = `https://2gis.kz/shymkent/search/${encodeURIComponent(
  COMPANY_ADDRESS,
)}`;

export const COMPANY_EMAIL = 'arbitrazh-shymkent@mail.ru';

export const COMPANY_PHONES: PhoneContact[] = [
  { display: '+7 (777) 042-62-62', href: 'tel:+77770426262' },
  { display: '+7 (700) 000-77-47', href: 'tel:+77000007747' },
  { display: '+7 (700) 000-88-38', href: 'tel:+77000008838' },
];
