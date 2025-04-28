/** @jsx jsx */

import { jsx } from './jsx.js';

import { translations } from './translations.js';
import { linkLabels } from './link-labels.js';
import { link } from './domains.js';

export const labelKeys = {
  dp: 'data-protection-notice',
  cp: 'cookies-policy',
  ci: 'cookies-inventory',
};

export const keys = {
  dp: 'data-protection',
  cp: 'cookies-policy',
  ci: 'cookies-inventory',
};

export const urlBuilder = ({ lang, slug }) =>
  `https://www.europarl.europa.eu/privacy-policy/${lang}/${slug}`;

export const linksBuilder =
  (url) =>
  ({ lang, dataMoreLink }) => {
    const { textBottom1, textBottom2, textBottom3 } = translations(lang);
    const labels = linkLabels[lang];

    const firstLink = [
      textBottom1,
      link(dataMoreLink || url({ lang, slug: keys.dp }), labels[labelKeys.dp]),
    ];

    return dataMoreLink ? (
      <p>{firstLink}</p>
    ) : (
      <p>
        {firstLink}{' '}
        {[
          textBottom2,
          link(url({ lang, slug: keys.cp }), labels[labelKeys.cp]),
        ]}{' '}
        {[
          textBottom3,
          link(url({ lang, slug: keys.ci }), labels[labelKeys.ci]),
        ]}{' '}
      </p>
    );
  };

export const links = linksBuilder(urlBuilder);
export const tag = (_) => '';
