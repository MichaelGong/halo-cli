
const Metalsmith = require('metalsmith');
const render = require('consolidate').handlebars.render;


const cwd = process.cwd();
/**
 * 使用promise封装metalsmith，并进行初始化
 * Metalsmith works in three simple steps:
 * 1. Read all the files in a source directory.
 * 2. Invoke a series of plugins that manipulate the files.
 * 3. Write the results to a destination directory!
 * @param {*} rootPath    初始化的根目录
 * @param {*} metaData    模板的数据
 * @param {*} source      模板所在的目录， 默认值：'./template'
 * @param {*} destination 将处理好的文件输出到的路径
 * @param {*} ignore      希望被忽略的文件，可以是字符串、数组、函数，详情请查看https://github.com/segmentio/metalsmith#cleanboolean
 */
function initMetalsmith(
  rootPath,
  metaData = {},
  source = './template',
  destination = cwd,
  ignore = ['.git', 'node_modules']
) {
  return new Promise((resolve, reject) => {
    Metalsmith(rootPath)
      .metadata(metaData)
      .clean(false)
      .source(source)
      .destination(destination)
      .ignore(ignore)
      .use((files, metalsmith, done) => {
        Object.keys(files).forEach((file) => {
          const str = files[file].contents.toString();
          if (!/{{([^{}]+)}}/g.test(str)) {
            return done();
          }
          render(str, metaData, (err, res) => {
            if (err) {
              console.log(err);
            }
            files[file].contents = Buffer.from(res);
            done();
          });
        });
      })
      .build(function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
  });
}

module.exports = initMetalsmith;
