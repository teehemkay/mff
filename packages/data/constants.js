export * from '@packages/etl/constants';

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
