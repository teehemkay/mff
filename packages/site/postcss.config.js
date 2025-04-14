// eslint-disable-next-line import/no-anonymous-default-export
export default {
  map: 'true',
  parser: 'postcss-scss',
  plugins: {
    '@csstools/postcss-sass': {},
    'postcss-pxtorem': { replace: true },
    'postcss-hexrgba': {},
    'postcss-svgo': {},
    '@tailwindcss/postcss': {},
  },
};
