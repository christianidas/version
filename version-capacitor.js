const fs = require('fs');
const sh = require('shelljs');
const readPlistFile = require('simple-plist').readFileSync;
const writePlistFile = require('simple-plist').writeFileSync;
const iosInfoPlistPath = './ios/App/App/Info.plist';

module.exports = ((params) => {
  const version = params.version;
  const noGit = params.noGit;

  if (fs.existsSync(iosInfoPlistPath)) {
    const plistObject = readPlistFile(iosInfoPlistPath);

    plistObject.CFBundleShortVersionString = version;
    plistObject.CFBundleVersion = version;

    writePlistFile(iosInfoPlistPath, plistObject);
    if (!noGit) {
      sh.exec(`git add ${iosInfoPlistPath}`);
    }
  }
});
