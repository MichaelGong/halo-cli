const inquirer = require('inquirer');
const gitUser = require('./git-user');

module.exports = function(projectName) {
    return inquirer.prompt([
        {
            name: 'projectName',
            message: '请输入项目名称',
            type: 'input',
            default: projectName,
        }, {
            name: 'projectVersion',
            message: '请输入项目版本号',
            type: 'input',
            default: '0.0.1',
        }, {
            name: 'projectDesc',
            message: '请输入项目描述',
            type: 'input',
            default: 'A vue project',
        }, {
            name: 'author',
            message: '请输入作者',
            type: 'input',
            default: gitUser,
        }, {
            name: 'install',
            message: '请选择依赖安装方式',
            type: 'list',
            choices: ['npm', 'yarn', '不需要安装依赖'],
            filter: function(val) {
                if (val === 'npm' || val === 'yarn') {
                    return val;
                }
                return 'not';
            },
        },
    ]);
};
