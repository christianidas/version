#!/usr/bin/env node

const argv = require('yargs').argv;
const calculateVersion = require('./calculate-version');
const versionPackage = require('./version-package');
const versionCapacitor = require('./version-capacitor');
const versionIOS = require('./version-ios');
const versionAndroid = require('./version-android');

(() => {
  if ((argv._[0] && argv._[0] === 'help') || argv.help) {
    const help = `version v0.1.0

      Usage:

        $ version [<version>] [args]

      Args:

        version ................. Exact version
        --release|-r ............ Release type (major|minor|patch) (Default: 'patch')
        --prerelease|-p ......... Prerelease tag (Any alphanumeric string) (Default: 'alpha')
        --no-git ................ Skip git commit and tag
        --allow-downgrade ....... Allow the version to be set to a lower prerelease
        --capacitor ............. Copy version to capacitor config file(s)
        --ios-config ............ Path to iOS Info.plist file
        --android-config ............ Path to iOS Info.plist file

    `;
    console.log(help);
    return;
  }

  const options = {};

  options.release = argv.release
    || argv.r
    || (argv.major ? 'major' : undefined)
    || (argv.minor ? 'minor' : undefined)
    || 'patch';

  options.prerelease = argv.prerelease || argv.p;
  options.message = argv.message || argv.m || '%s';
  options.noGit = argv.git === false;
  options.allowDowngrade = !!argv.allowDowngrade;
  options.capacitor = !!argv.capacitor;
  options.iosConfig = argv.iosConfig;
  options.androidConfig = argv.androidConfig;

  if (options.prerelease && (typeof options.prerelease) === 'boolean') {
    options.prerelease = 'alpha';
  }

  options.version = argv._[0] || calculateVersion(options);

  if (options.capacitor) {
    versionCapacitor(options);
  }

  if (options.iosConfig) {
    versionIOS(options);
  }

  if (options.androidConfig) {
    versionAndroid(options);
  }

  return versionPackage(options);
})();
