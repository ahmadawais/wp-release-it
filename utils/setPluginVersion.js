const ora = require('ora');
const spinner = ora({ text: '' });
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const { setValue } = require('wp-file-header-metadata');
const getHeaderFile = require('./getHeaderFile.js');
const getPluginVersion = require('./getPluginVersion.js');

module.exports = async version => {
	const prev = await getPluginVersion();
	spinner.start(`${yellow(`UPDATING`)} version (${yellow(prev)} to ${green(version)})…`);
	const filename = await getHeaderFile();
	setValue('Version', version, filename);
	setValue('Stable tag', version, 'readme.txt');
	spinner.succeed(`${green(`UPDATED`)} version (${yellow(prev)} to ${green(version)})`);
};
