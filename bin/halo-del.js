#!/usr/bin/env node
const program = require('commander');
const templateJson = require('../projecttemplate.json');
const setJson = require('../lib/setJson');

program
  .usage('<template name>')
  .description('Delete one custom project template by name')
  .parse(process.argv);

const args = program.args;

if (args.length < 1) {
  return program.help();
}

delete templateJson[args[0]];

setJson(templateJson).then((err) => {
  if (err) throw err;
  console.log();
  console.log('    删除项目模板成功');
  console.log();
});

