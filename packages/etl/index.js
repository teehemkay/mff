import path from 'node:path';

import { exportContent, contentFile } from './lib/content.js';
import { exportLocalEvents, localEventsFile } from './lib/local-events.js';

export const files = {
  content: contentFile,
  localEvents: localEventsFile,
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

  localEvents() {
    exportLocalEvents(...withDefaultParams(files.localEvents));
  },
};

export const exportAll = (
  from = defaults.importsFolder,
  to = defaults.dataFolder,
) => {
  const withParams = makeArgs(to, startPath(from));

  exportContent(...withParams(files.content));
  exportLocalEvents(...withParams(files.localEvents));
};

export { exportContent } from './lib/content.js';
export { exportLocalEvents } from './lib/local-events.js';
