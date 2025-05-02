import gulp from 'gulp';

import { js, scss } from '@repo/build-tools';

const { parallel } = gulp;

export const { process: processScss, watch: watchScss } = scss;
export const { bundle, watchBundle } = js;

export const build = parallel(processScss, bundle);

export const watch = parallel(watchScss, watchBundle);

export { build as default };
