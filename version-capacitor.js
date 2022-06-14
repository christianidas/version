const versionIOS = require('./version-ios');
const versionAndroid = require('./version-android');

module.exports = ((params) => {
  versionIOS({
    ...params,
    iosConfig: params.iosConfig || './ios/App/App/Info.plist',
  });
  versionAndroid({
    ...params,
    androidConfig: params.androidConfig || './android/app/build.gradle',
  });
});
