#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const Metalsmith = require('metalsmith');
const render = require('consolidate').handlebars.render;
const checkDir = require('../lib/dir');
const initMetalsmith = require('../lib/initMetalsmith');
const downloadAndGenerate = require('../lib/download-git');
const inquirerFunc = require('../lib/inquirer');
const installDependencies = require('../lib/installDependencies').installDependencies;

const gitRepoUrl = 'https://github.com:MichaelGong/vue-template#master';

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

// 检查项目目录是否存在
function checkProjectDir(projectName, locationPath, rootDir) {
  return new Promise((resolve, reject) => {
    if (projectName) { // 传入了项目名称
      if (checkDir.isEmptyDir(locationPath)) { // 空文件夹
        if (rootDir === projectName) {
          resolve(locationPath);
        } else {
          resolve(path.resolve(locationPath, projectName));
        }
      } else if (fs.existsSync(path.resolve(locationPath, projectName))) {
        console.log(chalk.yellow(`  ${projectName}项目已存在`));
        reject();
      } else {
        resolve(path.resolve(locationPath, projectName));
      }
    } else { // 没有传入项目名称
      // 这里基本是不会走进来的
      program.help();
      reject();
    }
  });
}

function downloadAndGenerateFunc() {
  return downloadAndGenerate(gitRepoUrl, path.join(__dirname, 'tmp'), true)
    .catch((err) => {
      console.log(err);
    });
}
/**
 * @param {*} pathParam 项目路径
 * @param {*} metadata 数据
 * @param {*} dest 目标目录
 */
// function initMetalsmith(pathParam, metadata = {}, dest = '.') {
//   Metalsmith(pathParam)
//     .metadata(metadata)
//     .clean(false)
//     .source('./template')
//     .destination(dest)
//     .ignore(path.resolve(pathParam, './generators/app/templates'))
//     .use((files, metalsmith, done) => {
//       Object.keys(files).forEach((file) => {
//         const str = files[file].contents.toString();
//         if (!/{{([^{}]+)}}/g.test(str)) {
//           return done();
//         }
//         render(str, metadata, (err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           files[file].contents = Buffer.from(res);
//           done();
//         });
//       });
//     })
//     .build(function(err) {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('');
//       console.log('项目已经生成');
//       console.log('');
//       if (metadata.install === 'npm' || metadata.install === 'yarn') {
//         installDependencies(pathParam, metadata.install)
//           .then(() => {
//             console.log('# 依赖安装完毕');
//           });
//       }
//     });
// }

program
  .usage('<project-name>')
  .option('-b, --branch <branch>', '分支名', 'master');

program.on('--help', genereateHelp);

program.parse(process.argv);
// 参数
const args = program.args;

// 没有参数
if (args && args.length < 1) {
  return program.help();
}

const projectName = program.args[0]; // 项目名称
const locationPath = process.cwd(); // 当前执行node的路径
const rootDir = path.basename(locationPath); // 根文件夹的名字
let projectPath = '.';
let metaData;

fs.removeSync(path.resolve(__dirname, 'tmp'));

checkProjectDir(projectName, locationPath, rootDir)
  .then((pathParam) => {
    projectPath = pathParam;
    // 用户交互输入信息
    return inquirerFunc(projectName);
  })
  .then((params) => {
    metaData = params;
    // 下载远程代码
    return downloadAndGenerateFunc();
  })
  .then(() => initMetalsmith(projectPath, metaData, path.join(__dirname, 'tmp', './template'), '.'))
  .then(() => {
    if (metaData.install !== 'not') {
      return installDependencies(projectPath, metaData.install)
        .then(() => {
          console.log('');
          console.log(chalk.cyan(`  cd ${projectName}`));
          console.log(chalk.cyan('  npm run dev'));
          console.log('');
        });
    }
  })
  .catch((err) => {
    console.log(chalk.yellow(`  ${err}`));
  });
