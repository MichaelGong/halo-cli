const latestVersion = require('latest-version');
const version = require('../package.json').version;

let status;
function getLatestVersion() {
  return latestVersion('halo-cli').then((versionRemote) => {
    status.versionRemote = versionRemote;
    if (versionRemote !== version) {
      status.isLatestVersion = false;
    }
    return versionRemote;
  });
}
status = {
  getLatestVersion,
  isLatestVersion: true,
  versionRemote: '',
};

module.exports = status;
