// https://github.com/flipxfx/download-git-repo
// var downloadUrl = require('download')
// var gitclone = require('git-clone');
var rm = require('rimraf').sync;
const spawn = require('cross-spawn');

/**
 * 执行git clone命令
 * @param {*} url git地址
 * @param {*} dest 将仓库clone到哪里
 * @param {*} opts opts.branch：clone的分支，默认master，暂时只有一个参数
 * @param {*} cb 命令执行后的回调
 */
function gitclone(url, dest, opts = {}, cb) {
  let options = Object.assign({ branch: 'master' }, opts);
  let args = ['clone'];
  let process;
  let errorStr = '';
  args.push('-b');
  args.push(options.branch);
  args.push(url);
  args.push(dest);
  process = spawn('git', args); //  { stdio: 'inherit' }
  process.stderr.setEncoding('utf8');
  process.stderr.on('data', function(data) {
    errorStr = data;
  });
  process.on('close', function(status) {
    if (status === 0) {
      cb && cb();
    } else {
      cb && cb(new Error("'git clone' failed with status " + status + ': \n  ' + errorStr));
    }
  });
}
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
      branch: repoArr[1] || 'master',
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
