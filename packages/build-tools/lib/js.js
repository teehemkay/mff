import path from 'node:path';

import gulp from 'gulp';
import gulpNotify from 'gulp-notify';
import gulpChanged from 'gulp-changed';
import gulpDebug from 'gulp-debug';
import gulpPlumber from 'gulp-plumber';
import gulpBabel from 'gulp-babel';
import gulpUglify from 'gulp-uglify';

import { rollup } from 'rollup';
import { babel as rollupBabel } from '@rollup/plugin-babel';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import {
  fileLogger,
  isProductionBuild,
  log,
  destFolder,
  showFiles,
  srcFolder,
  watcher,
} from './utils.js';

const srcJs = srcFolder(`js/**/*.js`);

const destJs = destFolder('assets/js');

export const transpiler = (args = {}) =>
  function transpileJs() {
    const { src = srcJs, dest = destJs } = args;

    return gulp
      .src(src, { sourcemaps: true })
      .pipe(gulpChanged(dest))
      .pipe(
        gulpPlumber({
          errorHandler: gulpNotify.onError('Erreur: <%= error.message %>'),
        })
      )
      .pipe(
        gulpDebug({
          title: fileLogger({ tag: 'babel', src, dest }),
          showFiles,
        })
      )
      .pipe(gulpBabel())
      .pipe(gulp.dest(dest, { sourcemaps: '.' }));
  };

export const transpile = transpiler();
export const transpileWatcher = (args = {}) => {
  const { what = 'babel', files = srcJs, handler = transpile } = args;

  return watcher({ what, files, handler });
};

export const watchTranspiled = transpileWatcher();

export const rollupInput = srcFolder('privacy-policy/js/index.js');
export const rollupOutput = destFolder(
  'assets/privacy-policy/privacy-policy.js'
);

const developmentInputPlugins = isProductionBuild ? [] : [];

export const defaultRollupInputPlugins = [
  rollupBabel({
    babelHelpers: 'bundled',
    exclude: 'node_modules',
  }),
  nodeResolve({ browser: true }),
  cjs(),
  json(),
  ...developmentInputPlugins,
];

export const defaultRollupOutputOptions = {
  format: 'iife',
  indent: true,
  sourcemap: true,
};

export const extendArgs = (args, moreArgs) =>
  moreArgs === null ? args : { ...args, ...moreArgs };

export const bundler = (args = {}) => {
  const {
    input = rollupInput,
    output = rollupOutput,
    name = 'bundle',
    format = 'umd',
    minify = isProductionBuild,
    id = path.basename(output, '.js'),
    external = null,
  } = args;

  const inputOptions = {
    input,
    external,
    plugins: defaultRollupInputPlugins,
  };

  const outputOptions = extendArgs(defaultRollupOutputOptions, {
    name,
    format,
    file: output,
    plugins: minify ? [terser()] : [],
    amd: format === 'amd' || format === 'umd' ? { id } : {},
  });

  return async function bundleJs() {
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    console.log(log(fileLogger({ tag: 'rollup', src: input, dest: output })));
  };
};

export const bundle = bundler();

export const bundleWatcher = (args = {}) => {
  const { what = 'js (bundle)', files = rollupInput, handler = bundle } = args;

  return watcher({ what, files, handler });
};

export const watchBundle = bundleWatcher();

export const minify = ({ dest, src }) =>
  function minifyJs() {
    return gulp
      .src(src, { sourcemaps: true })
      .pipe(gulpChanged(dest))
      .pipe(
        gulpDebug({
          title: fileLogger({ tag: 'minify js', src, dest }),
          showFiles,
        })
      )
      .pipe(gulpUglify())
      .pipe(gulp.dest(dest, { sourcemaps: '.' }));
  };
