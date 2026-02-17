import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/locales/en/translation.json';
import zhTWTranslation from '@/locales/zh-TW/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  'zh-TW': {
    translation: zhTWTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-TW'],
    interpolation: {
      escapeValue: false,
    },
    // Language is set manually on the client to avoid SSR/CSR mismatches.
  });

export default i18n;
