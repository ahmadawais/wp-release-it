const ora = require('ora');
const spinner = ora({ text: '' });
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const getTestedUptoVersion = require('./getTestedUptoVersion');

module.exports = async () => {
	spinner.start(`${yellow(`CURRENT`)} version of "Tested up to"…`);
	const ver = await getTestedUptoVersion();
	spinner.succeed(`${green(`CURRENT`)} version of "Tested up to": ${green(ver)}`);
	return ver;
};
