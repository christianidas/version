const fs = require('fs');
const sh = require('shelljs');
const replace = require('replace-in-file');

module.exports = ((params) => {
  const version = params.version;
  const noGit = params.noGit;
  const androidConfig = params.androidConfig;

  if (fs.existsSync(androidConfig)) {
    replace.sync({
      files: androidConfig,
      from: /versionName\s+.*/,
      to: `versionName "${version}"`,
    });

    let versionCode = 0;
    const versionParts = version.split('.');
    if (versionParts[0]) {
      versionCode += parseInt(versionParts[0], 10) * 10000, 10;
    }
    if (versionParts[1]) {
      versionCode += parseInt(versionParts[1], 10) * 100, 10;
    }
    if (versionParts[2]) {
      versionCode += parseInt(versionParts[2], 10);
    }
    replace.sync({
      files: androidConfig,
      from: /versionCode\s+.*/,
      to: `versionCode ${versionCode}`,
    });
    if (!noGit) {
      sh.exec(`git add ${androidConfig}`);
    }
  }
});
