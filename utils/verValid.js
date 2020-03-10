const logSymbols = require('log-symbols');
const semverValid = require('semver/functions/valid');

module.exports = async version => {
	const isValid = semverValid(version) ? true : false;
	if (!isValid) {
		console.log(
			`${logSymbols.error} Enter a vaild version. E.g. major.minor.patch i.e. 5.3.2\n`
		);
		process.exit(0);
	}
};
