import process from 'node:process';
import path from 'node:path';

import fs from 'fs-extra';
import { glob } from 'glob';

export const collect = async ({ src, cwd, ignore }) => {
  const sources = Array.isArray(src) ? src : [src];
  const filesToCopyP = [];

  for (const source of sources) {
    const files = glob(source, { cwd, ignore, nodir: true });

    filesToCopyP.push(files);
  }

  const collected = await Promise.all(filesToCopyP);

  return collected.flat();
};

export const copier = async (parameters) => {
  const { src, dest, cwd = process.cwd(), ignore = [] } = parameters;
  // Step 1: Validate input parameters
  if (!src || !dest) {
    throw new Error('Both src and dest parameters are required');
  }

  // Step 2: Provide overview of the requested work

  const result = {
    summary: [
      'Copy operation overview:',
      `cwd path: ${cwd}`,
      `source(s): ${Array.isArray(src) ? src.join(', ') : src}`,
      `destination: ${dest}`,
      `exclusions: ${ignore.length > 0 ? ignore.join(', ') : 'None'}`,
    ],
    copiedFiles: [],
    errors: [],
  };

  // Step 3: Collect all files to be copied
  const files = await collect({ src, cwd, ignore });

  // Step 4: Perform the copy operation
  /* eslint-disable no-await-in-loop */
  for (const file of files) {
    const srcFile = path.join(cwd, file);
    const destFile = path.join(cwd, dest, file);

    try {
      await fs.copy(srcFile, destFile, {
        overwrite: true,
        preserveTimestamps: true,
        errorOnExist: false,
      });

      result.copiedFiles.push({
        srcFile,
        destFile,
      });
    } catch (error) {
      result.errors.push({
        srcFile,
        error: error.message,
      });
      // Stop on error
      break;
    }
  }
  /* eslint-enable no-await-in-loop */

  // Step 5: Return the result
  return result;
};

export default copier;
