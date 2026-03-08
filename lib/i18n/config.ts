import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/locales/en/translation.json';
import zhHKTranslation from '@/locales/zh-HK/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  'zh-HK': {
    translation: zhHKTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-HK'],
    interpolation: {
      escapeValue: false,
    },
    // Language is set manually on the client to avoid SSR/CSR mismatches.
  });

export default i18n;
