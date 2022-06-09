const versionIOS = require('./version-ios');

module.exports = ((params) => {
  const iosConfig = params.iosConfig || './ios/App/App/Info.plist';
  return versionIOS({
    ...params,
    iosConfig,
  })
});
