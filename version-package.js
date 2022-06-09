const sh = require('shelljs');

module.exports = ((params) => {
  const version = params.version;
  const message = params.message;
  const noGit = params.noGit;

  let script = `npm version ${version} --allow-same-version -f --workspaces --include-workspace-root`;
  if (message) {
    script += ` -m "${message}"`;
  }
  if (noGit) {
    script += ` --no-git-tag-version`;
  }

  sh.exec(script);
});
