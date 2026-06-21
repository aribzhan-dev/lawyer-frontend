// Kompaniya bog'lanish ma'lumotlari — bitta joyda saqlanadi (DRY).
// O'zgartirish kerak bo'lsa faqat shu faylni tahrirlash kifoya.

export interface PhoneContact {
  /** Ekranda ko'rsatiladigan format */
  display: string;
  /** tel: havolasi uchun raqam */
  href: string;
}

// Manzil — chiroyli ko'rsatish uchun qatorlarga bo'lingan
// ("Каратауский район" bir qatorda turishi uchun).
export const COMPANY_ADDRESS_LINES = [
  'РК, г. Шымкент,',
  'Каратауский район,',
  'жилой массив Сайрам,',
  'ул. Амир Темир, дом № 237/9,',
  '2 этаж, каб. 2',
];

// 2GIS havolasi va matn uchun to'liq manzil (qatorlardan yig'iladi).
export const COMPANY_ADDRESS = COMPANY_ADDRESS_LINES.join(' ');

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
