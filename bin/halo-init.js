#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-plus');
const path = require('path');
const checkProjectDir = require('../lib/dir').checkProjectDir;
const initMetalsmith = require('../lib/initMetalsmith');
const downloadAndGenerate = require('../lib/download-git');
const inquirerFunc = require('../lib/inquirer');
const installDependencies = require('../lib/installDependencies').installDependencies;

// git 仓库地址，请注意格式：中间是“:”，且最后没有“.git”
const gitRepoUrl = 'https://github.com:MichaelGong/vue-template';

/**
 * 输出help信息
 */
function genereateHelp() {
  let chalkColor = chalk.cyan;
  console.log();
  console.log(chalkColor('  Examples:'));
  console.log(chalk.gray('    # create a new project by name'));
  console.log(chalkColor('    $ halo init my-project'));
  console.log();
}

program
  .usage('<project-name>')
  .option('-b, --branch <branch>', '分支名', 'master'); // 允许指定分支（暂时就一个分支：master）

program.on('--help', genereateHelp);

program.parse(process.argv); // 处理参数
// 参数
const args = program.args;

// 没有参数
if (args && args.length < 1) {
  return program.help();
}

const projectName = program.args[0]; // 项目名称
const cwd = process.cwd(); // 当前执行node的路径
const rootDir = path.basename(cwd); // 根文件夹的名字
const tmpPath = path.join(__dirname, 'tmp');
let projectPath = '.'; // 项目路径
let metaData; // 用户输入的信息

// 删除tmp下之前下载的文件
fs.removeSync(path.resolve(__dirname, 'tmp'));

checkProjectDir(projectName, cwd, rootDir)
  .then((pathParam) => {
    projectPath = pathParam; // 项目路径
    // 用户交互输入信息
    return inquirerFunc(projectName);
  })
  .then((params) => {
    metaData = params; // 用户输入的信息
    // 下载远程代码：git路径添加分支，下载到命令所在位置的tmp文件夹下，clone模式
    return downloadAndGenerate(`${gitRepoUrl}#${program.branch}`, tmpPath, true);
  })
  .then(() => initMetalsmith(tmpPath, metaData, path.join(tmpPath, 'template'), projectPath))
  .then(() => {
    // 如果选择了安装依赖，就进行依赖安装
    if (metaData.install !== 'not') {
      return installDependencies(projectPath, metaData.install)
        .then(() => {
          console.log('');
          console.log('To Start:');
          console.log('');
          console.log(chalk.cyan(`  cd ${projectName}`));
          console.log(chalk.cyan('  npm run dev'));
          console.log('');
        });
    }
  })
  .catch((err) => {
    if (err) {
      console.log(chalk.yellow(`  ${err}`));
    }
  });
