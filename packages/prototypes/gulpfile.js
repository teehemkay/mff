import gulp from 'gulp';

import { prototypes, scss } from '@packages/build-tools';

const { parallel } = gulp;

export const { process: processScss, watch: watchScss } = scss;

export const { process: buildPrototypes, watch: watchPrototypes } = prototypes;

export const build = parallel(processScss, buildPrototypes);

export const watch = parallel(watchScss, watchPrototypes);

export { build as default };
