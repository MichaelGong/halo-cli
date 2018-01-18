export default function formatDate(str) {
  let date;
  let time;
  if (!str) return '';
  date = new Date(str);
  time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if ((time / 1000 < 30)) {
    return '刚刚';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000), 10) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000), 10) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000, 10) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000, 10) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000, 10) + '月前';
  }
  return parseInt(time / 31536000000, 10) + '年前';
}
