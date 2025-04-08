import { kMetadata, kIndex, kLocalEvents, kCountries } from '../constants.js';

import {
  lvObjectContainer,
  fieldProcessors as defaultFieldProcessors,
  markdownProcessor,
  rowProcessor,
  addRow,
  tabProcessor,
  readXls,
  writeLVs,
} from './common.js';

export const contentFile = '2025_ED - Content';

export const tabnames2Filenames = {
  Metadata: kMetadata,
  Homepage: kIndex,
  LocalEvents: kLocalEvents,
  Countries: kCountries,
};

export const fieldProcessors = {
  ...defaultFieldProcessors,
  edDescription: markdownProcessor,
};

export const exportContent = (contentFile, destination) => {
  console.log(`\n> Importing content from ${contentFile}.xlsx\n`);
  const xls = readXls(contentFile);
  const processRow = rowProcessor(fieldProcessors);
  const processTab = tabProcessor(processRow, addRow);

  for (const [tabname, filename] of Object.entries(tabnames2Filenames)) {
    console.log(`>> ${tabname} -> [${destination}, ${filename}]`);
    writeLVs({
      lvs: processTab(xls, tabname, lvObjectContainer()),
      destination,
      filename,
    });
  }
};

export const test = (contentFile) => {
  const xls = readXls(contentFile);
  const processRow = rowProcessor(fieldProcessors);
  const processTab = tabProcessor(processRow, addRow);
  const container = lvObjectContainer();

  return (tabname) => processTab(xls, tabname, container);
};

export { kMetadata, kIndex } from '../constants.js';

export {
  lvObjectContainer,
  fieldProcessors as defaultFieldProcessors,
  markdownProcessor,
  rowProcessor,
  addRow,
  tabProcessor,
  readXls,
  writeLVs,
} from './common.js';
