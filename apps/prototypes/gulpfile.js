import gulp from 'gulp';

import { js, prototypes, scss } from '@packages/build-tools';

const { parallel } = gulp;

export const { process: processScss, watch: watchScss } = scss;

export const {
  process: processPrototypes,
  watch: watchPrototypes,
  watchComponents: watchPrototypesComponents,
} = prototypes;

export const { transpile, watchTranspiled } = js;

export const build = parallel(processScss, transpile, processPrototypes);

export const watch = parallel(
  watchScss,
  watchTranspiled,
  watchPrototypes,
  watchPrototypesComponents
);

export { build as default };
