import {
  kMetadata,
  kIndex,
  kWhyItMatters,
  kHowItWorks,
  kOurRole,
  kOurPosition,
  kByCountry,
  kCountries,
} from '../constants.js';

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

export const contentFile = 'MFFContent';

export const tabnames2Filenames = {
  Metadata: kMetadata,
  Homepage: kIndex,
  'Why it matters': kWhyItMatters,
  'How it works': kHowItWorks,
  'Our role': kOurRole,
  'Our position': kOurPosition,
  'By country': kByCountry,
  Countries: kCountries,
};

export const fieldProcessors = {
  ...defaultFieldProcessors,
  faqAnswer: markdownProcessor,
  homeIntroText: markdownProcessor,
  pageChapo: markdownProcessor,
  pageContent: markdownProcessor,
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

export {
  kMetadata,
  kIndex,
  kWhyItMatters,
  kHowItWorks,
  kOurRole,
  kOurPosition,
  kByCountry,
  kCountries,
} from '../constants.js';

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
