// https://github.com/flipxfx/download-git-repo
// var downloadUrl = require('download')
var gitclone = require('git-clone');
var rm = require('rimraf').sync;

/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Object} opts
 * @param {Function} fn
 */

function download(repo, dest) {
  let repoArr = repo.split('#');
  return new Promise((resolve, reject) => {
    gitclone(repoArr[0], dest, {
      checkout: repoArr[1] || 'master',
      shallow: true,
    }, function(err) {
      if (err === undefined) {
        rm(dest + '/.git');
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
/**
 * Expose `download`.
 */

module.exports = download;
