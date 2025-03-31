import path from 'node:path';
import process from 'node:process';

import filter from 'gulp-filter';
import zip from 'gulp-zip';
import gulp from 'gulp';
import gulpDebug from 'gulp-debug';
import { execa } from 'execa';

import {
  clean,
  destFolder,
  distFolder,
  outFolder,
  fileLogger,
  showFiles,
  log,
} from './utils.js';

import { copier } from './copier.js';

import { generateVersionString } from './versioning.js';

export const datestampFolder = (date) =>
  `${date.toISOString().replaceAll(/[:.]/g, '-')}`;

export const filterOutEmptyFiles = filter(
  (v) => v.isBuffer() && v.contents.toString().trim().length > 0
);

const srcFiles = distFolder('js/*.@(js|map)');

export const zipper = (args = {}) => {
  const { name = 'site', src = 'out', dest = destFolder('') } = args;
  const zipFile = `../${dest}/${name}.zip`;
  return async () => {
    console.log(
      log(
        fileLogger({
          tag: 'zipper',
          src,
          dest: `${dest}/${name}.zip`,
        })
      )
    );
    try {
      // Change to the specified directory
      process.chdir(src);

      // Execute zip command
      await execa('zip', ['-rq', zipFile, '.']);
      const { stdout } = await execa('zipinfo', ['-h', '-t', '-z', zipFile]);

      // Change back to the original directory
      process.chdir('..');

      // Print archive statistics
      console.log(log(stdout));
    } catch (error) {
      console.log(log('Error occurred during compression:', error.message));
    }
  };
};

export const compressor = (args = {}) =>
  async function compress() {
    const {
      dest = distFolder('zips'),
      src = srcFiles,
      name = 'eng-assets',
    } = args;
    const filename = await generateVersionString({ name });

    return gulp
      .src(src)
      .pipe(
        gulpDebug({
          title: fileLogger({
            tag: 'zipper',
            src,
            dest: `${dest}/${filename}.zip`,
          }),
          showFiles,
        })
      )
      .pipe(zip(`${filename}.zip`))
      .pipe(gulp.dest(dest));
  };

export const artefacts = (args = {}) => {
  const {
    cwd = path.join(process.cwd(), '_site'),
    src = '**',
    dest = path.join('..', outFolder(datestampFolder(new Date()))),
    ignore = ['prototypes/**'],
  } = args;

  return copier({ cwd, src, dest, ignore });
};

export const compress = zipper({ src: outFolder('') });

export const bundle = gulp.series(
  artefacts,
  compress,
  clean({ deletions: [outFolder('')] })
);

export {
  clean,
  copier,
  destFolder,
  destExclude,
  distFolder,
  outFolder,
  fileLogger,
  showFiles,
} from './utils.js';

export { generateVersionString } from './versioning.js';
