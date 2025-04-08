export const kIndex = 'index';
export const kMetadata = 'metadata';
export const kLocalEvents = 'local-events';
export const kEPLOs = 'eplos';
export const kCountriesByLangFile = 'countries-by-lang';
export const kCountries = 'countries';
export const kLanguages = 'languages';

export const languageCodes = [
  'en',
  'bg',
  'hr',
  'cs',
  'da',
  'et',
  'fi',
  'fr',
  'ga',
  'de',
  'el',
  'hu',
  'it',
  'lv',
  'lt',
  'mt',
  'nl',
  'pl',
  'pt',
  'ro',
  'sk',
  'sl',
  'es',
  'sv',
];

export const xExceptions = new Map([
  ['cs', 'cz'],
  ['da', 'dk'],
  ['ee', 'et'],
  ['gr', 'el'],
  ['ie', 'ga'],
]);

export const xAccount = (countryOrLanguage) => {
  const key = countryOrLanguage.toLowerCase();

  return xExceptions.has(key)
    ? `Europarl_${xExceptions.get(key).toUpperCase()}`
    : `Europarl_${key.toUpperCase()}`;
};
