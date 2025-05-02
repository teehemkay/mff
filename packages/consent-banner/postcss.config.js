export const config = (ctx) => ({
  map: ctx.options?.map || 'true',
  parser: ctx.options?.parser || 'postcss-scss',
  plugins: {
    '@csstools/postcss-sass': {},
    'postcss-pxtorem': { replace: true },
    'postcss-hexrgba': {},
    'postcss-svgo': {},
    autoprefixer: {},
  },
});

export default config;
