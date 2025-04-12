import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import yaml from 'yaml';

import {
  kIndex,
  kLanguages,
  kMetadata,
  kCountries,
  kCountriesByLangFile,
  pageLabelKeys,
} from './constants.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const siteUrl = 'https://eubudget.europarl.europa.eu/';

export const canonicalHref = (lang, currentPage) =>
  currentPage === kIndex
    ? `${siteUrl}/${lang}/`
    : `${siteUrl}/${lang}/${currentPage}/`;

export const loadYaml = (path) => yaml.parse(readFileSync(path, 'utf8'));

// Data files are usually but not always stored by linguistic versions (LVs)
// We use cwd to build the path because this is stable and equal to the root
// of the project reading the data (e.g. apps/site, apps/video, astro/hearings)
// TODO: find a more robust way to refer to the location of the data repository
// Using a path relative (see __dirname below) to this script doesn't work.
// Astro (and probably nextjs too) uses codegen which break relative path assumptions.
//
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
//  path.join(__dirname, 'repository', lang, `${dataType}.yml`);
export const dataFilename = (dataType, lang) =>
  path.join(__dirname, 'repository', lang, `${dataType}.yml`);

// Load (the linguistic version of) a data file
export const loadData = (dataType, lang = '') => {
  const filename = dataFilename(dataType, lang);
  try {
    return loadYaml(filename);
  } catch (error) {
    console.log(`!!! ERROR: data::loadData(${filename})`);
    console.error(error);

    return {};
  }
};

export const languages = loadData(kLanguages);

export const lvContainer = () =>
  Object.keys(languages).reduce((acc, lang) => {
    acc[lang] = {};
    return acc;
  }, {});

export const __DATA__ = lvContainer();

export const getDataByLangAndType = ({ dataType, lang }) => {
  try {
    const ct = __DATA__[lang][dataType];

    if (ct) {
      return ct;
    }

    __DATA__[lang][dataType] = loadData(dataType, lang);

    return __DATA__[lang][dataType];
  } catch (error) {
    console.log(
      `!!! ERROR: data::getDataByLangAndType ->  lang: ${lang}, type: ${dataType}`,
    );
    console.error(error);
  }
};

export const getData = (dataType) => (lang) =>
  getDataByLangAndType({ dataType, lang });

export const zip = (xs, ys) => xs.map((x, idx) => ({ ...x, ...ys[idx] }));

export const contentForPage = (pageName, lang) => getData(pageName)(lang);

export const countries = getData(kCountries);
export const metadata = getData(kMetadata);

export const pageLabels = (lang) => {
  const data = metadata(lang);
  return pageLabelKeys.map(([key, property]) => ({
    key,
    label: data[property],
  }));
};
