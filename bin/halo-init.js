#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const rm = require('rimraf').sync;
const checkProjectDir = require('../lib/dir').checkProjectDir;
const initMetalsmith = require('../lib/initMetalsmith');
const downloadAndGenerate = require('../lib/download-git');
const inquirerFunc = require('../lib/inquirer');
// const installDependencies = require('../lib/installDependencies').installDependencies;
const checkLatest = require('../lib/checkLatest');
const version = require('../package.json').version;
const originJson = require('../projecttemplate.json');
const { customConfig } = require('../lib/setCustomConfig');
const { isLocalPath } = require('../lib/util');

const tmpDir = '.tmp'; // tmp文件夹名字
const templateJson = Object.assign({}, originJson, customConfig);

/**
 * 输出help信息
 */
function genereateHelp() {
  let chalkColor = chalk.cyan;
  console.log();
  console.log(chalkColor('  Examples:'));
  console.log(chalk.gray('    # create a new project by name'));
  console.log(chalkColor('    $ halo init vue my-project'));
  console.log();
}
program
  .usage('<template-name> <project-name>')
  .parse(process.argv); // 处理参数

program.on('--help', genereateHelp);
// 参数
const args = program.args;
// 没有参数
if (args && args.length < 2) {
  return program.help();
}
const templateName = args[0]; // 模板名称
const projectName = args[1]; // 项目名称
const cwd = process.cwd(); // 当前执行node的路径
const rootDir = path.basename(cwd); // 根文件夹的名字
let tmpPath = path.join(__dirname, tmpDir, templateName);

if (!templateJson[templateName]) {
  console.log('');
  console.log('请先使用add命令添加该模板配置');
  console.log('');
  return;
}
if (isLocalPath(templateJson[templateName].registry)) {
  tmpPath = templateJson[templateName].registry;
}
let projectPath = '.'; // 项目路径
let metaData; // 用户输入的信息
let metaJson; // 模板项目中的meta.js中的内容

// 删除tmp中之前下载的文件
rm(path.resolve(__dirname, tmpDir));
// 判断当前版本与npm的版本
checkLatest.getLatestVersion();
// 判断项目目录状态
checkProjectDir(projectName, cwd, rootDir)
  .then((pathParam) => {
    projectPath = pathParam;
    return downloadAndGenerate(`${templateJson[templateName].registry}`, tmpPath, true);
  })
  .then(() => inquirerFunc(projectName, path.resolve(tmpPath, 'meta.js'))) // 用户交互输入信息
  .then((params) => {
    metaData = params.metaData; // 用户输入的信息
    metaJson = params.metaJson;
    return initMetalsmith(tmpPath, metaData, path.join(tmpPath, 'template'), projectPath);
  })
  .then(() => new Promise((resolve) => {
    if (metaJson.complete && typeof metaJson.complete === 'function') {
      metaJson.complete({
        metaData,
        projectPath,
      }).then(() => {
        resolve();
      });
    } else {
      resolve();
    }
  }))
  .then(() => {
    console.log('');
    console.log('  项目初始化成功');
    console.log('');
    if (!checkLatest.isLatestVersion) {
      console.log(chalk.cyan(`\n halo-cli当前版本${version}，最新版本${checkLatest.versionRemote}，请更新\n`));
    }
  })
  .catch((err) => {
    if (err) {
      console.log(chalk.yellow(`  ${err}`));
    }
  });
