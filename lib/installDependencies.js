const { spawn } = require('child_process');

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

module.exports = {
  runCommand,
};
