#!/usr/bin/env node
const { join } = require('path');

/**
 * Setup the GitHub actions outputs
 * -> semver
 * -> image
 * -> environment
 */

const semver = require('./release')();
const root = join(__dirname, '..', '..');
const { version } = require(join(root, 'package.json'));
const tag = semver.replace(/\+/g, '-').replace(/\.\d+$/, '');
const environment = (() => {
  // We are on GitHub Actions
  switch (process.env.GITHUB_REF) {
    case 'refs/heads/main':
      return 'prod';
    case 'refs/heads/dev':
      return 'dev';
  }

  return 'preview';
})();
const domain = (() => {
  switch (environment) {
    case 'prod':
      return 'app.my-website.ai';
    case 'dev':
      return 'dev.my-website.ai';
  }
})();

const secrets = (() => {
  switch (environment) {
    case 'prod':
      return 'MYWEBSITE_PROD';
    case 'dev':
      return 'MYWEBSITE_DEV';
  }
})();

process.stdout.write(`::set-output name=semver::${semver}\n`);
process.stdout.write(`::set-output name=tag::${tag}\n`);
process.stdout.write(`::set-output name=environment::${environment}\n`);
process.stdout.write(`::set-output name=domain::${domain}\n`);
process.stdout.write(`::set-output name=secrets::${secrets}\n`);
process.stdout.write(`::set-output name=version::${version}\n`);
