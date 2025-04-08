import { contentForLang, countriesForLang } from '@packages/data';
import {
  kIndex,
  kLocalEvents,
  kEPLOs,
  languageCodes,
} from '@packages/data/constants';

// TODO: why is import.meta.env.BASE_URL crashing astro
// Cannot split a chunk that has already been edited (0:7 – "import.meta")

export const basePath = '';
export const kAssetsDir = `/assets/`;

export const isHomepage = (page) =>
  page === kIndex || languageCodes.includes(page);

export const propsKey = (page) => (isHomepage(page) ? kIndex : kLocalEvents);

export const makeHref = ({ currentPage, lang }) =>
  currentPage === kIndex
    ? `/${lang}/`
    : currentPage === kLocalEvents
      ? `/${lang}/${currentPage}/`
      : `/${lang}/${kLocalEvents}/${currentPage}/`;

export const placeHolderRx = /\[[^\]]+]/;
export const doubleBracketRx = /\[\[[^\]]+]]/;

export const splitOnPlaceHolder = (template) => {
  const results = template.match(placeHolderRx);

  if (results === null) {
    console.log(`!!! bogus template w/o "[...]" place holder: "${template}"`);
    return null;
  }

  const prefix = template.slice(0, results.index);
  const suffix = template.slice(results.index + results[0].length);
  return { prefix, suffix };
};

export const substituteWith = (template, replacement) => {
  const results = splitOnPlaceHolder(template);
  return results
    ? `${results.prefix}${replacement}${results.suffix}`
    : template;
};

export const slugify = (key) =>
  key
    .trim()
    .split(' ')
    .map((item) => item.toLowerCase())
    .join('-');

export const countryKeys = Object.keys(countriesForLang('en'));
export const countryPage2CountryKey = countryKeys.reduce((acc, key) => {
  acc[slugify(key)] = key;
  return acc;
}, {});

export const eplosForLang = (lang) => contentForLang(kEPLOs, lang);

export {
  languages,
  contentForLang as props,
  metadataForLang as metadata,
  countriesForLang,
  countriesByLang,
} from '@packages/data';

export {
  kIndex,
  kLocalEvents,
  languageCodes,
  xAccount,
} from '@packages/data/constants';

export const getStaticPaths = /* @__NO_SIDE_EFFECTs__ */ () => {
  const slugs = [
    {
      params: { slug: undefined },
      props: {
        lang: 'en',
        currentPage: kIndex,
      },
    },
  ];

  for (const lang of languageCodes) {
    slugs.push(
      {
        params: { slug: lang },
        props: { lang, currentPage: kIndex },
      },
      {
        params: { slug: `${lang}/${kLocalEvents}` },
        props: { lang, currentPage: kLocalEvents },
      },
    );

    for (const countryPageName of ['all', ...countryKeys.map(slugify)]) {
      slugs.push({
        params: { slug: `${lang}/${kLocalEvents}/${countryPageName}` },
        props: { lang, currentPage: countryPageName },
      });
    }
  }

  return slugs;
};
