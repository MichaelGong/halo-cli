function line(str, len) {
  var lineStr = new Array(Math.max(1, len - str.length)).join('-');
  return ' ' + lineStr + ' ';
}

module.exports = {
  line,
};
