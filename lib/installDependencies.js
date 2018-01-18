const { spawn } = require('child_process');
const chalk = require('chalk');

/**
 * 安装依赖
 * @param {string} cmd 命令名
 * @param {array} args 命令参数
 * @param {object} options 其他的参数
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve) => {
    const spwanInstance = spawn(
      cmd,
      args,
      Object.assign({
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true,
      }, options),
    );
    spwanInstance.on('exit', () => {
      resolve();
    });
  });
}
/**
 * 安装依赖：npm install 或者 yarn install
 * @param {string} cwd 命令执行的所在路径
 * @param {string} executable npm或者yarn
 */
function installDependencies(cwd, executable = 'npm') {
  console.log('');
  console.log(chalk.blue('# 正在安装依赖'));
  console.log('');
  return runCommand(executable, ['install'], {
    cwd,
  }).then(() => {
    console.log('');
    console.log(chalk.blue('# 依赖安装完毕'));
  });
}

module.exports = {
  runCommand,
  installDependencies,
};
