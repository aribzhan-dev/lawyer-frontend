import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 1024; // lg — совпадает с переключением вёрстки

/**
 * Mobil ekran o'lchamini aniqlaydi.
 * Mobil brauzerlar PDF ni <iframe> ichida ko'rsata olmaydi, shuning uchun
 * bu hook yordamida mobil holatda boshqa UI (ochish/yuklash) ko'rsatamiz.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}
