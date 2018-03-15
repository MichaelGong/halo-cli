#!/usr/bin/env node
const program = require('commander');
const {
  customConfig,
  setCustomConfig,
} = require('../lib/setCustomConfig');

program
  .usage('<template name>')
  .description('Delete one custom project template by name')
  .parse(process.argv);

const args = program.args;

if (args.length < 1) {
  return program.help();
}

delete customConfig[args[0]];

setCustomConfig(customConfig).then((err) => {
  if (err) throw err;
  console.log();
  console.log('    删除项目模板成功');
  console.log();
});

