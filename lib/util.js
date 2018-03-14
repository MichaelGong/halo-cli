function line(str, len) {
  var lineStr = new Array(Math.max(1, len - str.length)).join('-');
  return ' ' + lineStr + ' ';
}
/**
 * 是否是本地路径
 * @param {*} templatePath 需要判断的路径
 */
function isLocalPath(templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
}

module.exports = {
  line,
  isLocalPath,
};
