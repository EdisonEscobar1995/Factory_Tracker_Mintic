import enUS from 'antd/es/locale/en_US';
import esES from 'antd/es/locale/es_ES';

const languages = {
  default: 'es',
  en: 'en',
  es: 'es',
};

const antdLocales = (language: string) => {
  const { en, es } = languages;
  switch (language) {
    case en:
      return enUS;
    case es:
    default:
      return esES;
  }
};

export default antdLocales;
