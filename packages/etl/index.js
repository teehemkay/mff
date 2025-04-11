import path from 'node:path';

import { exportContent, contentFile } from './lib/content.js';

export const files = {
  content: contentFile,
};

export const defaults = {
  importsFolder: '../../_imports',
  dataFolder: '../data/repository',
};

const startPath = (importsFolder) => (filename) =>
  path.join(importsFolder, filename);

const makeArgs = (destination, pathTo) => (filename) => [
  pathTo(filename),
  destination,
];

export const withDefaultParams = makeArgs(
  defaults.dataFolder,
  startPath(defaults.importsFolder),
);

export const write = {
  content() {
    exportContent(...withDefaultParams(files.content));
  },
};

export const exportAll = (
  from = defaults.importsFolder,
  to = defaults.dataFolder,
) => {
  const withParams = makeArgs(to, startPath(from));

  exportContent(...withParams(files.content));
};

export { exportContent } from './lib/content.js';
