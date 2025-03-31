import through from 'through2';

import gulp from 'gulp';
import gulpDebug from 'gulp-debug';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';

import autoprefixer from 'autoprefixer';
import scssParser from 'postcss-scss';
import postcssSass from '@csstools/postcss-sass';
import postcssHexrgba from 'postcss-hexrgba';
import postcssPxtorem from 'postcss-pxtorem';
import postcssSvgo from 'postcss-svgo';

import {
  showFiles,
  srcFolder,
  destFolder,
  watcher,
  fileLogger,
} from './utils.js';

export const destination = destFolder('assets/css');

export const files = srcFolder('scss/**/*.scss');
export const sources = srcFolder('scss/*.scss');

export const postcssPlugins = [
  postcssSass,
  postcssPxtorem({ replace: true }),
  postcssHexrgba,
  postcssSvgo,
  autoprefixer,
];

export const processor = (args = {}) =>
  function transpileScss() {
    const { src = sources, dest = destination } = args;
    // const minifier = new CssCleaner(cleanCssOptions);

    return (
      gulp
        .src(src, { sourcemaps: true })
        .pipe(
          plumber({
            errorhandler: notify.onError('erreur: <%= error.message %>'),
          })
        )
        .pipe(postcss(postcssPlugins, { parser: scssParser }))
        .pipe(
          rename((path) => {
            path.extname = '.css';
          })
        )
        .pipe(
          // the orginal scss file may not have changed
          // but since we regenerate the css
          // we ensure that its moddate is updated
          // N.B.: DO NOT USE arrow function since this function
          // is internally used as a instance method...
          through.obj(function touch(file, _, cb) {
            if (file.isBuffer() && file.stat) {
              file.stat.mtime = new Date();
            }

            cb(null, file);
          })
        )
        // .pipe(cleanCss(minifier))
        .pipe(
          gulpDebug({
            title: fileLogger({ tag: 'postcss', src, dest }),
            showFiles,
          })
        )
        .pipe(gulp.dest(dest, { sourcemaps: '.' }))
    );
  };

export const process = processor();

export const watch = watcher({
  what: 'scss',
  files,
  handler: process,
});
