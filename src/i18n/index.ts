import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslations from '../locales/ru/translation.json';
import kkTranslations from '../locales/kk/translation.json';

const resources = {
  ru: { translation: ruTranslations },
  kk: { translation: kkTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'kk'],
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
