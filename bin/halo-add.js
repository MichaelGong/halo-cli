#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const {
  customConfig,
  setCustomConfig,
} = require('../lib/setCustomConfig'); // 用户自定义配置

const handleCustom = function handleCustom(config) {
  setCustomConfig(config).then(() => {
    console.log();
    console.log('    添加项目模板成功');
    console.log();
  }).catch((err) => {
    console.log(err);
  });
};
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

if (customConfig[args[0]]) {
  inquirer.prompt([{
    name: 'isDel',
    message: `${args[0]}模板已经存在，是否删除原模板？`,
    type: 'confirm',
    default: true,
  }]).then((data) => {
    if (data.isDel) {
      if (typeof customConfig[args[0]] === 'object') {
        customConfig[args[0]].registry = args[1];
      } else {
        customConfig[args[0]] = {};
        customConfig[args[0]].registry = args[1];
      }
      customConfig[args[0]].registry = args[1];
      handleCustom(customConfig);
    }
  });
} else {
  customConfig[args[0]] = {
    registry: args[1],
  };
  handleCustom(customConfig);
}

