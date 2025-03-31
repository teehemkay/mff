import through from 'through2';
import gulp from 'gulp';
import gulpDebug from 'gulp-debug';
import include from 'gulp-file-include';
import changed from 'gulp-changed';
import gulpIf from 'gulp-if';

import {
  srcFolder,
  destFolder,
  fileLogger,
  showFiles,
  watcher,
} from './utils.js';

export const prototypesSources = srcFolder(`html/*.html`);
export const prototypeComponents = srcFolder(`html/components/**/*.html`);
export const prototypesDest = destFolder('');

export const processor = (args = {}) =>
  function processPrototypes() {
    const {
      src = prototypesSources,
      dest = prototypesDest,
      doFullRebuild = false,
    } = args;

    return gulp
      .src(src)
      .pipe(gulpIf(!doFullRebuild, changed(dest)))
      .pipe(
        // it may be that the original html file has not changed.
        // but since we regenerate it, we ensure that
        // its moddate is updated
        // n.b.: do not use arrow function since this function
        // is internally used as a instance method...
        through.obj(function touch(file, _, cb) {
          if (file.isBuffer() && file.stat) {
            file.stat.mtime = new Date();
          }

          cb(null, file);
        })
      )
      .pipe(include())
      .pipe(
        gulpDebug({
          title: fileLogger({ tag: 'prototypes', src, dest }),
          showFiles,
        })
      )
      .pipe(gulp.dest(dest));
  };

export const process = processor({ doFullRebuild: true });

export const watch = watcher({
  what: 'prototypes',
  files: prototypesSources,
  handler: processor(),
});

export const watchComponents = watcher({
  what: 'prototypes',
  files: prototypeComponents,
  handler: process,
});
