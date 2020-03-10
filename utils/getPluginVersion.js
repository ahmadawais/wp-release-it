const ora = require('ora');
const spinner = ora({ text: '' });
const semverCoerce = require('semver/functions/coerce');
const semverValid = require('semver/functions/valid');
const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const { getValue } = require('wp-file-header-metadata');
const getHeaderFile = require('./getHeaderFile.js');

module.exports = async () => {
	const filename = await getHeaderFile();
	const version = await getValue('Version', filename);
	const validVersion = semverValid(semverCoerce(version));
	return validVersion;
};
