import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslations from './es/translations';
import enTranslations from './en/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
