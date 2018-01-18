const fs = require('fs-plus');
const path = require('path');
const chalk = require('chalk');

/**
 * 根据路径判断是否是空文件夹
 * @param {*} path 路径
 */
function isEmptyDir(pathUrl) {
  if (!pathUrl) {
    return false;
  }
  let isDir = fs.isDirectorySync(pathUrl);
  let dirInfo;
  if (!isDir) {
    return false;
  }
  dirInfo = fs.readdirSync(pathUrl);
  if (!dirInfo[0]) {
    return true;
  }
  return false;
}

// 检查项目目录是否存在
function checkProjectDir(projectName, locationPath, rootDir) {
  return new Promise((resolve, reject) => {
    if (projectName) { // 传入了项目名称
      if (isEmptyDir(locationPath)) { // 空文件夹
        if (rootDir === projectName) {
          resolve(locationPath);
        } else {
          resolve(path.resolve(locationPath, projectName));
        }
      } else if (fs.existsSync(path.resolve(locationPath, projectName))) {
        console.log(chalk.yellow(`  ${projectName}项目已存在`));
        reject();
      } else {
        resolve(path.resolve(locationPath, projectName));
      }
    } else { // 没有传入项目名称
      // 这里基本是不会走进来的
      reject();
    }
  });
}

module.exports = {
  isEmptyDir,
  checkProjectDir,
};
