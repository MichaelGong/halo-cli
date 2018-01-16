const fs = require('fs');

module.exports = {
  isEmptyDir(path) { // 根据路径判断是否是空文件夹
    if (!path) {
      return false;
    }
    let isDir = this.isDir(path);
    let dirInfo;
    if (!isDir) {
      return false;
    }
    dirInfo = fs.readdirSync(path);
    if (!dirInfo[0]) {
      return true;
    }
    return false;
  },
  isDir(path) { // 判断路径是否是目录
    if (!path) {
      return false;
    }
    let stat = fs.statSync(path);
    return stat.isDirectory();
  },
};
