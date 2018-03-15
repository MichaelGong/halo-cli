/**
 * 用户自定义配置处理文件
*/
const fs = require('fs-plus');
const path = require('path');
const ini = require('ini');
const echo = require('node-echo');

// 用户自定义配置文件路径
const HALORC = path.join(process.env.HOME, '.halorc');
// 用户自定义配置
const customConfig = fs.existsSync(HALORC)
  ? ini.parse(fs.readFileSync(HALORC, 'utf-8'))
  : {};
/**
 * 配置用户自定义配置
 * @param {*} config
 */
function setCustomConfig(config = {}) {
  return new Promise((resolve, reject) => {
    echo(ini.stringify(config), '>', HALORC, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
module.exports = {
  HALORC,
  customConfig,
  setCustomConfig,
};
