import process from 'node:process';
import path from 'node:path';

import fs from 'fs-extra';
import { deleteAsync } from 'del';
// import debug from 'debug';
import gulp from 'gulp';
import gulpDebug from 'gulp-debug';
import changed from 'gulp-changed';

export const isProductionBuild = process.env.NODE_ENV === 'production';

export const fileLogger = ({ tag, src, dest }) => `${tag}: ${src} -> ${dest}`;

export const zeroPad = (number) => `${number}`.padStart(2, '0');

export const timestamp = (ts) =>
  `[${zeroPad(ts.getHours())}:${zeroPad(ts.getMinutes())}:${zeroPad(
    ts.getSeconds()
  )}]`;

export const log = (message) => `${timestamp(new Date())} ${message}`;

export const debugEnable = (tag) =>
  process.env.DEBUG && process.env.DEBUG.includes(tag);

export const showFiles = debugEnable('showfiles');

export const handleTrailingSlash = (path) => (path === '' ? '' : `/${path}`);

export const folderPath = (folder) => (path) =>
  `${folder}${handleTrailingSlash(path)}`;

export const excludePath = (folder) => (path) =>
  `!${folder}${handleTrailingSlash(path)}`;

export const buildFolder = folderPath('build');
export const destExclude = excludePath('_site');
export const destFolder = folderPath('_site');
export const distFolder = folderPath('dist');
export const libFolder = folderPath('lib');
export const outExclude = excludePath('out');
export const outFolder = folderPath('out');
export const publicFolder = folderPath('public');
export const rootFolder = folderPath('');
export const resourceFolder = folderPath('resources');
export const srcExclude = excludePath('src');
export const srcFolder = folderPath('src');

export const clean = ({ deletions }) =>
  function clean() {
    console.log(log(`delete: ${deletions}`));
    return deleteAsync(deletions);
  };

export const copier = ({ src, dest }) =>
  function copy() {
    return gulp
      .src(src)
      .pipe(changed(dest))
      .pipe(
        gulpDebug({ title: fileLogger({ tag: 'copy', src, dest }), showFiles })
      )
      .pipe(gulp.dest(dest));
  };

export const mover = ({ src, dest }) => {
  const from = `${src}`;
  const to = `${dest}`;

  log(fileLogger({ tag: 'mover', src: from, dest: to }));
  return fs.move(from, to, { overwrite: true });
};

export const watcher = ({ what, files, handler }) =>
  function watcher() {
    console.log(log(`${what} watcher: ${files}\n`));
    return gulp.watch(files, handler);
  };

export const resolvePath = ({ cwd, relPath }) =>
  cwd ? path.join(cwd, relPath) : relPath;
