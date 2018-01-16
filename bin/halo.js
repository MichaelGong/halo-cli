#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .description('初始化项目的cli脚手架工具：Halo')
// .command('hello', 'this is description of hello') // hello 是命令名字，后面跟上hello的说明，commander会自动寻找到biu-hello.js的文件，具体可以查看源码中的executeSubCommand这个函数（其中的bin表示读取了对应的命名文件） ：https://github.com/tj/commander.js/blob/master/index.js#L512
  .command('init', 'generate a new project from a template')
  .parse(process.argv);
