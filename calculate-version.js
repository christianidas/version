const fs = require('fs');
const semver = require('semver');
const packageJsonFilePath = 'package.json';

module.exports = ((params) => {
  const release = params.release;
  const prerelease = params.prerelease;
  const allowDowngrade = params.allowDowngrade;

  const file = JSON.parse(fs.readFileSync(packageJsonFilePath));
  const oldVersion = file.version;

  if (!params) {
    return oldVersion;
  }

  let newVersion;

  if (prerelease) {
    if (semver.prerelease(oldVersion)) {
      newVersion = semver.inc(oldVersion, 'prerelease', prerelease);
    } else {
      newVersion = semver.inc(oldVersion, `pre${release}`, prerelease);
    }

    if (semver.lt(newVersion, oldVersion) && !allowDowngrade) {
      newVersion = semver.inc(oldVersion, `pre${release}`, prerelease);
    }
  } else {
    newVersion = semver.inc(oldVersion, release);
  }

  return newVersion;
});
