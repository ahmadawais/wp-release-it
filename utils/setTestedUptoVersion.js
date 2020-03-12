const ora = require('ora');
const spinner = ora({ text: '' });
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const gitTestedUptoRelease = require('./gitTestedUptoRelease.js');
const { setValue } = require('wp-file-header-metadata');

module.exports = async version => {
	spinner.start(`${yellow(`UPDATING`)} "Tested up to" version…`);
	await setValue('Tested up to', version, 'readme.txt');
	spinner.succeed(`${green(`UPDATED`)} "Tested up to" version to: ${green(version)}`);
	spinner.start(`${yellow(`PUSHING`)} the git commit`);
	await gitTestedUptoRelease(version);
	spinner.succeed(`${green(`PUSHED`)} the git commit`);
};
