import { languageCodes, kCountriesByLangFile } from '../constants.js';

import {
  splitAndTrim,
  arrayContainer,
  readXls,
  getTab,
  writeLVs,
  writeDataFile,
} from './common.js';

export const localEventsFile = '2025_ED - EPLOs';

export const eplosByCountry = {
  Austria: ['Wien'],
  Belgium: ['Bruxelles - Brussel'],
  Bulgaria: ['Sofia'],
  Croatia: ['Zagreb'],
  Cyprus: ['Nicosia'],
  Czechia: ['Praha'],
  Denmark: ['København'],
  Estonia: ['Tallinn'],
  Finland: ['Helsinki - Helsingfors'],
  France: ['Paris', 'Marseille'],
  Germany: ['München', 'Berlin'],
  Greece: ['Athinai'],
  Hungary: ['Budapest'],
  Ireland: ['Dublin'],
  Italy: ['Milano', 'Roma'],
  Latvia: ['Riga'],
  Lithuania: ['Vilnius'],
  Luxembourg: ['Luxembourg'],
  Malta: ['Valetta'],
  Netherlands: ['Den Haag'],
  Poland: ['Wroclaw', 'Warszawa'],
  Portugal: ['Lisboa'],
  Romania: ['Bucuresti'],
  Slovakia: ['Bratislava'],
  Slovenia: ['Ljubljana'],
  Spain: ['Barcelona', 'Madrid'],
  Sweden: ['Stockholm'],
  'United Kingdom': ['London', 'Edinburgh'],
  'United States': ['Washington DC'],
};

export const kCountriesByLang = 'Countries by language';

// :: () -> { Lang: ArrayContainer }
export const eploLVsContainer = () =>
  languageCodes.reduce((acc, lang) => {
    acc[lang] = arrayContainer(Object.keys(eplosByCountry));
    return acc;
  }, {});

export const eploFromRow = (row) => {
  const lang = row.lang.trim();
  const country = row.country.trim();
  const city = row.city.trim();
  const email = row.email.trim();
  const website = row.website.trim();

  if (lang === undefined) {
    return [];
  }

  const address = Object.keys(row).reduce(
    (acc, fieldname) =>
      fieldname.startsWith('addressL') ? [...acc, row[fieldname].trim()] : acc,
    [],
  );

  return [lang.toLowerCase(), { country, city, address, email, website }];
};

export const eploRowProcessor = (countryEN) => (container, row) => {
  const [lang, eplo] = eploFromRow(row);

  if (lang === undefined) {
    return container;
  }

  container[lang][countryEN] = [...container[lang][countryEN], eplo];

  return container;
};

export const eploTabProcessor = (xls, country) => (container, tabName) =>
  getTab(xls, tabName).reduce(eploRowProcessor(country), container);

export const eplosForCountryProcessor = (xls) => (container, country) =>
  eplosByCountry[country].reduce(eploTabProcessor(xls, country), container);

export const importEPLOs = (xls) =>
  Object.keys(eplosByCountry).reduce(
    eplosForCountryProcessor(xls),
    eploLVsContainer(),
  );

export const extractCountriesByLang = (xls) =>
  getTab(xls, kCountriesByLang).reduce((acc, item) => {
    acc[item.lang] = splitAndTrim(item.countries, '/');
    return acc;
  }, {});

export const processCountriesByLang = (xls, destination) => {
  console.log(
    `>> ${kCountriesByLang} -> [${destination}, ${kCountriesByLangFile}]`,
  );
  writeDataFile({
    payload: extractCountriesByLang(xls),
    filename: `${kCountriesByLangFile}.yml`,
    destination,
  });
};

export const exportLocalEvents = (localEventsFile, destination) => {
  console.log(`\n> Importing eplos data from ${localEventsFile}.xlsx`);
  const xls = readXls(localEventsFile);
  console.log(`\n>> [Countries] -> [${destination}, eplos]`);
  writeLVs({
    lvs: importEPLOs(xls),
    filename: 'eplos',
    destination,
  });

  processCountriesByLang(xls, destination);
};

export const test = (localEventsFile) => {
  const xls = readXls(localEventsFile);
  const processCountry = eplosForCountryProcessor(xls);
  const container = eploLVsContainer();

  return (country) => processCountry(container, country);
};

export {
  splitAndTrim,
  arrayContainer,
  readXls,
  getTab,
  writeLVs,
  writeDataFile,
} from './common.js';
