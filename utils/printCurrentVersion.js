const ora = require('ora');
const spinner = ora({ text: '' });
const semverCoerce = require('semver/functions/coerce');
const semverValid = require('semver/functions/valid');
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const { getValue } = require('wp-file-header-metadata');

module.exports = async () => {
	spinner.start(`${yellow(`CURRENT`)} version of "Tested up to"…`);
	const version = await getValue('Tested up to', 'readme.txt');
	const currentVersion = semverValid(semverCoerce(version));
	spinner.succeed(`${green(`CURRENT`)} version of "Tested up to": ${green(currentVersion)}`);
	return currentVersion;
};
