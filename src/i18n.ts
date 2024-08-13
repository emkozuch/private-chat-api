import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],

    backend: {
      loadPath: path.resolve(__dirname, 'translations', '{{lng}}.json'),
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
    },
    debug: false,
  });

export default i18next;
