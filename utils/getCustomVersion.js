const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { prompt } = require('enquirer');
const to = require('await-to-js').default;
const semverValid = require('semver/functions/valid');

module.exports = async () => {
	const [errVersion, customVersion] = await to(
		prompt({
			type: `input`,
			name: `customVersion`,
			initial: `5.4.0`,
			message: `Define the custom "Tested up to" version?`,
			validate(value) {
				return !value || !semverValid(value)
					? `Enter a vaild version. E.g. major.minor.patch i.e. 5.3.2`
					: true;
			}
		})
	);
	handleError(`NAME`, errVersion);
	await shouldCancel(customVersion);

	return customVersion.customVersion;
};
