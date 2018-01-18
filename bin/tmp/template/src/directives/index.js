import color from './color';
// 自动识别当前目录下的js文件
// const files = require.context('./', true, /^\.\/([\w\W]*)\.js$/);
// const directives = {};
// files.keys().forEach((key) => {
//   if (key === './index.js') return;
//   directives[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
// });

export default {
  color,
};
