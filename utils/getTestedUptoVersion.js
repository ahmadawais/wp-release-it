const semverCoerce = require('semver/functions/coerce');
const semverValid = require('semver/functions/valid');
const { getValue } = require('wp-file-header-metadata');

module.exports = async () => {
	const version = await getValue('Tested up to', 'readme.txt');
	const currentVersion = semverValid(semverCoerce(version));
	return currentVersion;
};
