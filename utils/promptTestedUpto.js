const getPluginVersion = require('./getPluginVersion.js');
const setPluginVersion = require('./setPluginVersion.js');
const semverValid = require('semver/functions/valid');
const shouldCancel = require('cli-should-cancel');
const handleError = require('cli-handle-error');
const to = require('await-to-js').default;
const { Toggle, prompt } = require('enquirer');

module.exports = async () => {
	const [err, update] = await to(
		new Toggle({
			name: `update`,
			message: `Do you want to update the "Tested up to" version?`
		}).run()
	);
	handleError(`TESTED PROMPT`, err);
	await shouldCancel(update);
	return update;
};
