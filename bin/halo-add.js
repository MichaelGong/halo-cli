#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const templateJson = require('../projecttemplate.json');
const setJson = require('../lib/setJson');

program
  .usage('<template name> <template url>')
  .description(`<template name> 模板名称
  <template url> 模板的git仓库地址`)
  .parse(process.argv); // 处理参数
// 处理后的参数
const args = program.args;
if (args && args.length < 2) {
  return program.help();
}
if (templateJson[args[0]]) {
  inquirer.prompt([{
    name: 'isDel',
    message: `${templateJson[args[0]]}模板已经存在，是否删除原模板？`,
    type: 'confirm',
    default: true,
  }]).then((data) => {
    if (data.isDel) {
      templateJson[args[0]] = args[1];
      setJson(templateJson).then((err) => {
        if (err) throw err;
        console.log();
        console.log('    添加项目模板成功');
        console.log();
      });
    }
  });
}

