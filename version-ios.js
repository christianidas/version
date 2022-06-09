const fs = require('fs');
const sh = require('shelljs');
const readPlistFile = require('simple-plist').readFileSync;
const writePlistFile = require('simple-plist').writeFileSync;

module.exports = ((params) => {
  const version = params.version;
  const noGit = params.noGit;
  const iosConfig = params.iosConfig;

  if (fs.existsSync(iosConfig)) {
    const plistObject = readPlistFile(iosConfig);

    plistObject.CFBundleShortVersionString = version;
    plistObject.CFBundleVersion = version;

    writePlistFile(iosConfig, plistObject);
    if (!noGit) {
      sh.exec(`git add ${iosConfig}`);
    }
  }
});
