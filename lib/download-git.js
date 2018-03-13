const download = require('./download-git-repo');
const ora = require('ora');

/**
 * @param {string} url 需要下载的库的地址 详情请查看https://github.com/flipxfx/download-git-repo
 * @param {*} path 将git仓库下载到哪里
 */
module.exports = function downloadAndGenerate(url, path) {
  return new Promise((resolve, reject) => {
    console.log();
    let spinner = ora({
      text: 'downloading template',
    });
    spinner.start();
    download(url, path).then((err) => {
      if (err) {
        spinner.fail('模板下载失败！');
        reject(err);
      } else {
        spinner.stop();
        resolve();
      }
    });
  });
};
