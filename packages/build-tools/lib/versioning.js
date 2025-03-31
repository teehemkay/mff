// Todo: add remove function to remove version.json

import process from 'node:process';

import { execa, execaSync } from 'execa';
import fs from 'fs-extra';

const { readFile, readFileSync, outputJSON, outputJSONSync } = fs;
const isDevMode = () => process.env.NODE_ENV !== 'production';

const usage =
  "!!!You *MUST* use one of the 'npm version' commands (see package.json) to update and tag a version.";

export const kFakeVersion = '0.0.0-test';
export const kFakeTag = `v${kFakeVersion}`;

export const kPkgJson = 'package.json';
export const kVersionFile = 'public/version.json';

export const hashFromGit = async () => {
  const { stdout } = await execa('git', ['rev-parse', '--verify', 'HEAD']);
  return stdout;
};

export const hashFromGitSync = () => {
  const { stdout } = execaSync('git', ['rev-parse', '--verify', 'HEAD']);
  return stdout;
};

export const tagFromGit = async (hash) => {
  const { stdout } = await execa('git', [
    'describe',
    '--exact-match',
    '--tags',
    hash,
  ]);

  return stdout;
};

export const tagFromGitSync = (hash) => {
  const { stdout } = execaSync('git', [
    'describe',
    '--exact-match',
    '--tags',
    hash,
  ]);

  return stdout;
};

export const gitHash = async (args = {}) => {
  const { devMode = isDevMode() } = args;

  return devMode
    ? hashFromGit()
    : process.env.ENG_PORTAL_ASSETS_GIT_HASH || hashFromGit();
};

export const gitHashSync = (args = {}) => {
  const { devMode = isDevMode() } = args;

  return devMode
    ? hashFromGitSync()
    : process.env.ENG_PORTAL_ASSETS_GIT_HASH || hashFromGitSync();
};

export const gitTag = async (args = {}) => {
  const { devMode = isDevMode() } = args;
  const { hash = await gitHash({ devMode }) } = args;

  return devMode ? kFakeTag : tagFromGit(hash);
};

export const gitTagSync = (args = {}) => {
  const { devMode = isDevMode() } = args;
  const { hash = gitHashSync({ devMode }) } = args;

  return devMode ? kFakeTag : tagFromGitSync(hash);
};

export const pkgVersion = async (args = {}) => {
  const { relPath = kPkgJson } = args;
  const pkgJson = await readFile(relPath);
  return JSON.parse(pkgJson, { encoding: 'utf8' }).version;
};

export const pkgVersionSync = (args = {}) => {
  const { relPath = kPkgJson } = args;
  const pkgJson = readFileSync(relPath);
  return JSON.parse(pkgJson, { encoding: 'utf8' }).version;
};

export function validate(args = {}) {
  const { tag, version, devMode = isDevMode() } = args;
  const validation = { error: false, message: '' };

  if (devMode) {
    return validation;
  }

  if (tag === '') {
    return {
      error: true,
      message: `The Git tag is missing for this version!\n${usage}`,
    };
  }

  if (`v${version}` !== tag) {
    return {
      error: true,
      message: `package.json version (v${version}) differs from git tag (${tag}).\n${usage}`,
    };
  }

  return validation;
}

export const getVersionData = async (args = {}) => {
  const { devMode = isDevMode() } = args;

  const { relPath = kPkgJson, hash = await gitHash({ devMode }) } = args;

  const {
    tag = await gitTag({ hash, devMode }),
    version = await pkgVersion({ relPath }),
  } = args;

  const { validation = validate({ tag, version, devMode }) } = args;

  return { hash, tag, validation };
};

export const getVersionDataSync = (args = {}) => {
  const { devMode = isDevMode() } = args;

  const { relPath = kPkgJson, hash = gitHashSync({ devMode }) } = args;

  const {
    tag = gitTagSync({ hash, devMode }),
    version = pkgVersionSync({ relPath }),
  } = args;

  const { validation = validate({ tag, version, devMode }) } = args;

  return { hash, tag, validation };
};

export const writeVersionData = (args = {}) => {
  const {
    relPath = kVersionFile,
    versionData: { hash, tag, validation },
  } = args;

  return validation.error
    ? Promise.reject(new Error(validation.message))
    : outputJSON(relPath, { hash, tag });
};

export const writeVersionDataSync = (args = {}) => {
  const {
    relPath = kVersionFile,
    versionData: { hash, tag, validation },
  } = args;

  return validation.error
    ? new Error(validation.message)
    : outputJSONSync(relPath, { hash, tag });
};

export const version = (args = {}) =>
  async function version() {
    const { devMode = isDevMode() } = args;
    const {
      relPath = kVersionFile,
      versionData = await getVersionData({ devMode }),
    } = args;

    return writeVersionData({ relPath, versionData });
  };

export const versionSync = (args = {}) =>
  function version() {
    const { devMode = isDevMode() } = args;
    const {
      relPath = kVersionFile,
      versionData = getVersionDataSync({ devMode }),
    } = args;

    return writeVersionDataSync({ relPath, versionData });
  };

export const generateVersionString = async (args = {}) => {
  const { name, devMode = isDevMode() } = args;

  const hash = await gitHash({ devMode });
  const tag = await gitTag({ hash, devMode });

  return `${name}-${tag.slice(1).replace('-', '.')}`;
};

export const generateVersionStringSync = (args = {}) => {
  const { name, devMode = isDevMode() } = args;

  const hash = gitHashSync({ devMode });
  const tag = gitTagSync({ hash, devMode });

  return `${name}-${tag.slice(1).replace('-', '.')}`;
};
