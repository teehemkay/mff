import {
  kIndex,
  kWhyItMatters,
  kHowItWorks,
  kOurRole,
  kOurPosition,
  kByCountry,
  kCountries,
  kLanguageCodes,
} from '@packages/data/constants';

// TODO: why is import.meta.env.BASE_URL crashing astro
// Cannot split a chunk that has already been edited (0:7 – "import.meta")

export const pageNames = [
  kIndex,
  kWhyItMatters,
  kHowItWorks,
  kOurRole,
  kOurPosition,
  kByCountry,
  kCountries,
];

export const range = /* @__NO_SIDE_EFFECTs__ */ (end, start = 0) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const pair = /* @__NO_SIDE_EFFECTs__ */ (arr1, arr2) => {
  const minLength = Math.min(arr1.length, arr2.length);
  return Array.from({ length: minLength }, (_, i) => [arr1[i], arr2[i]]);
};

export const makeHref = ({ currentPage, lang }) =>
  currentPage === kIndex ? `/${lang}/` : `/${lang}/${currentPage}/`;

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

  for (const lang of kLanguageCodes) {
    slugs.push({
      params: { slug: lang },
      props: { lang, currentPage: kIndex },
    });

    for (const page of pageNames) {
      slugs.push({
        params: { slug: `${lang}/${page}` },
        props: { lang, currentPage: page },
      });
    }
  }

  return slugs;
};
