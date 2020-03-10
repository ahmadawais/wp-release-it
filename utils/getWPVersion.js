const axios = require('axios');
const ora = require('ora');
const spinner = ora({ text: '' });
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;

module.exports = async () => {
	spinner.start(`${yellow(`LATEST`)} WordPress version…`);
	const wpApiUrl = 'https://api.wordpress.org/core/version-check/1.7/';
	const wpData = await axios.get(wpApiUrl);
	const wpVersion = wpData.data.offers[0].version;
	spinner.succeed(`${green(`LATEST`)} WordPress version: ${green(wpVersion)}`);
	return wpVersion;
};
