import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './translate/en.json';
import faTranslations from './translate/fa.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations
    },
    fa: {
      translation: faTranslations
    }
  },
  lng: 'en',
  fallbackLng: 'en'
});

export default i18n;