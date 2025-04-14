import path from 'node:path';

import fs from 'fs-extra';
import debug from 'debug';

import { marked } from 'marked';
import yaml from 'yaml';

import * as XLSX from '../_vendor/xlsx.mjs';
import { kLanguageCodes as languages } from '../constants.js';

XLSX.set_fs(fs);

const log = debug('etl::common');

export const exclusionMarkers = ['removed', 'not used', 'never used'];
export const splitAndTrim = (s, sep) => s.split(sep).map((s) => s.trim());

// type ObjectContainer = { String: {...} }
// :: [String] -> ObjectContainer
export const objectContainer = (xs) =>
  xs.reduce((acc, x) => {
    acc[x] = {};
    return acc;
  }, {});

export const lvObjectContainer = () => objectContainer(languages);

// type ArrayContainer = { String: [...] }
// :: [String] -> ArrayContainer
export const arrayContainer = (xs) =>
  xs.reduce((acc, x) => {
    acc[x] = [];
    return acc;
  }, {});

/* alias FieldName = String
 * type XlsRow = {FieldName: String | Number | Date}
 * XlsRow example:
 * {
 *   'Field name': 'MetaTitle',
 *   EN: 'Austria - How to vote',
 *   DE: 'Österreich - Wie wähle ich?'
 *   ...
 * }
 *
 * :: (Xls, ContentType) -> [XlsRow]
 */
export const getTab = (xls, tabname) => {
  const data = XLSX.utils.sheet_to_json(xls.Sheets[tabname]);

  return data;
};

// :: String -> Xls
export const readXls = (filename) => XLSX.readFile(`${filename}.xlsx`);

// alias Filepath = String
// :: (Filename, Lang) -> Filepath
export const lvDest = ({ destination, filename, lang }) =>
  path.join(destination, lang, `${filename}.yml`);

// :: JsObject, Filepath -> IO ()
export const writeYaml = (content, path) => {
  log(`writeYaml -> ${path}`);
  fs.outputFileSync(path, yaml.stringify(content).trim());
};

export const readYaml = (path) => yaml.parse(fs.readFileSync(path, 'utf8'));

export const writeLV = ({ lv, destination, filename, lang }) => {
  writeYaml(lv, lvDest({ destination, filename, lang }));
};

export const writeLVs = ({ lvs, filename, destination }) => {
  for (const [lang, lv] of Object.entries(lvs)) {
    if (Object.keys(lv).length > 0) {
      writeLV({ lv, lang, destination, filename });
    }
  }
};

export const writeDataFile = ({ payload, destination, filename }) => {
  writeYaml(payload, path.join(destination, filename));
};

export const fieldProcessors = {
  default: (s) => (s && typeof s === 'string' && s.trim()) || '',
};

// from https://github.com/markedjs/marked/issues/655#issuecomment-712380889
const defaultRenderer = new marked.Renderer();
const linkRenderer = defaultRenderer.link;
const renderer = {
  link(tokens) {
    const html = linkRenderer.call(this, tokens);
    return tokens.href.startsWith('/') ||
      tokens.href.includes('europarl.europa.eu')
      ? html
      : html.replace(
          /^<a /,
          `<a target="_blank" rel="noreferrer noopener nofollow" `,
        );
  },
};

marked.use({ renderer });
export const markdownProcessor = (s) => (s ? marked.parse(s) : '');

/**
 * For the XlsRow, we extract its 'Field name' and all its translations.
 * We run the translation through a processor which can manipulate the value in any way.
 * The default processor just trims the value.
 * The resulting ObjetContainer keys are the Langs, and their corresponding values
 * are all the (fieldname, translation) pairs for that Lang
 * Example:
 * { fieldName: <fieldName>,
 *   values: [
 *     ['en', <enValue>],
 *     ['fr', <frValue>],
 *     ...
 *   ]
 * }
 */
// :: (XslRow) -> {field: String, values: [[lang: String, String], ...]}
export const rowProcessor = (fieldProcessors) => (row) => {
  const comments = row.Comments?.toLowerCase() ?? '';

  for (const marker of exclusionMarkers) {
    if (comments.startsWith(marker)) {
      return null;
    }
  }

  const fieldName = row['Field name'];

  if (fieldName === undefined) {
    return null;
  }

  // console.log(`\n- field: ${fieldName}`);
  const processField = fieldProcessors[fieldName] || fieldProcessors.default;

  const values = languages.map((lang) => [
    lang,
    processField(row[lang.toUpperCase()]),
  ]);

  return {
    fieldName,
    values,
  };
};

export const addRow = (rowValues, container, _tabName) => {
  if (rowValues === null) {
    return container;
  }

  const fieldName = rowValues.fieldName;
  return rowValues.values.reduce((acc, [lang, value]) => {
    const previousValue = acc[lang][fieldName];
    acc[lang][fieldName] =
      // eslint-disable-next-line unicorn/no-negated-condition
      previousValue !== undefined
        ? Array.isArray(previousValue)
          ? [...previousValue, value]
          : [previousValue, value]
        : value;

    return acc;
  }, container);
};

export const addRowTabbed = (rowValues, container, tabName) => {
  if (rowValues === null) {
    return container;
  }

  const fieldName = rowValues.fieldName;

  return rowValues.values.reduce((acc, [lang, value]) => {
    // process.stdout.write(`${lang} `);

    if (acc[lang][tabName] === undefined) {
      acc[lang][tabName] = {};
    }

    const previousValue = acc[lang][tabName][fieldName];
    acc[lang][tabName][fieldName] =
      // eslint-disable-next-line unicorn/no-negated-condition
      previousValue !== undefined
        ? Array.isArray(previousValue)
          ? [...previousValue, value]
          : [previousValue, value]
        : value;

    return acc;
  }, container);
};

// ::
// :: Xls -> TabName -> ObjectContainer
export const tabProcessor = (processRow, addRow) => (xls, tabName, container) =>
  getTab(xls, tabName).reduce(
    (acc, row) => addRow(processRow(row), acc, tabName),
    container,
  );

export const groupById = (id, items) => {
  return items.reduce((acc, item) => {
    // Destructure to separate id from other properties
    const { [id]: key, ...rest } = item;

    // Initialize array for this id if it doesn't exist
    acc[key] ||= [];

    // Add the object (without id) to the appropriate array
    acc[key].push(rest);

    return acc;
  }, {});
};

export { marked } from 'marked';
