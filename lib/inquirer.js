/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const inquirer = require('inquirer');
const gitUser = require('./git-user');

module.exports = function(projectName, filePath) {
  let params = require(filePath);
  let prompts = params.prompts;
  let arr = [];
  if (prompts.projectName && typeof prompts.projectName === 'object') {
    prompts.projectName.default = projectName;
  }
  if (prompts.author && typeof prompts.author === 'object') {
    prompts.author.default = gitUser;
  }
  Object.keys(prompts).forEach((item) => {
    arr.push(prompts[item]);
  });
  return new Promise((resolve) => {
    inquirer.prompt(arr).then((data) => {
      resolve({
        metaData: data,
        metaJson: params,
      });
    });
  });
};
