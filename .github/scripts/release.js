#!/usr/bin/env node
const { join } = require('path');
const { execSync } = require('child_process');

/**
 * Get the full semver version.
 * Pattern: x.y.z-commit
 * @return {string}
 */
function getRelease() {
  const root = join(__dirname, '..', '..');
  const { version } = require(join(root, 'package.json'));
  let commit;

  try {
    commit = execSync('git rev-parse HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf-8',
    });
  } catch (_) {
    commit = 'unknown';
  }

  const build = process.env.GITHUB_RUN_NUMBER ? process.env.GITHUB_RUN_NUMBER : '0000';

  return `${version}+${commit.substring(0, 7)}.${build}`;
}

// Allow the module to be used like a normal CommonJS library
module.exports = getRelease;

if (require.main === module) {
  // Print the release if run as a program
  process.stdout.write(`${getRelease()}\n`);
}
