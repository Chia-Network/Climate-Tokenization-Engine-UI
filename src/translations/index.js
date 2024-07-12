import * as en from './tokens/en-US.json';
import * as es from './tokens/es.json';
import * as fr from './tokens/fr.json';
import * as de from './tokens/de.json';
import * as cn from './tokens/zh-cn.json';

const LANGUAGE_CODES = Object.freeze({
  ENGLISH: 'en-US',
  PAK: 'pk-PK',
  SPANISH: 'es-ES',
  FRENCH: 'fr-FR',
  GERMAN: 'de-DE',
  CHINESE: 'cn',
});

const loadLocaleData = locale => {
  switch (locale) {
    case LANGUAGE_CODES.SPANISH:
      return es;
    case LANGUAGE_CODES.FRENCH:
      return fr;
    case LANGUAGE_CODES.GERMAN:
      return de;
    case LANGUAGE_CODES.CHINESE:
      return cn;
    case LANGUAGE_CODES.ENGLISH:
    default:
      return en;
  }
};

export { loadLocaleData, LANGUAGE_CODES };
