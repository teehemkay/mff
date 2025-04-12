import {
  kIndex,
  kWhyItMatters,
  kHowItWorks,
  kOurRole,
  kOurPosition,
  kByCountry,
} from '@packages/etl/constants';

export const kAssetsDir = '/assets/';

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

export const kPageLabelKeys = [
  [kIndex, 'pageLabelHome'],
  [kWhyItMatters, 'pageLabelWhyItMatters'],
  [kHowItWorks, 'pageLabelHowItWorks'],
  [kOurRole, 'pageLabelOurRole'],
  [kOurPosition, 'pageLabelOurPosition'],
  [kByCountry, 'pageLabelByCountry'],
];

export const kPageLabelKeysMapping = new Map(kPageLabelKeys);

export * from '@packages/etl/constants';
