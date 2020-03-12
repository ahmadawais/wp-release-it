const getPluginVersion = require('./getPluginVersion.js');
const gitPluginRelease = require('./gitPluginRelease.js');
const setPluginVersion = require('./setPluginVersion.js');
const semverValid = require('semver/functions/valid');
const shouldCancel = require('cli-should-cancel');
const handleError = require('cli-handle-error');
const to = require('await-to-js').default;
const { Toggle, prompt } = require('enquirer');

module.exports = async () => {
	let didRelease = false;
	const [err, tag] = await to(
		new Toggle({
			name: `tag`,
			message: `Do you want to release a new version of this WordPress plugin?`
		}).run()
	);
	handleError(`TAG`, err);
	await shouldCancel(tag);

	if (tag) {
		const prev = await getPluginVersion();
		const [errVersion, releaseVersion] = await to(
			prompt({
				type: `input`,
				name: `releaseVersion`,
				initial: `${prev}`,
				message: `Enter the new version?`,
				validate(value) {
					if (value === prev) {
						return `You have to enter a new version. Current version is ${prev}`;
					}

					return !value || !semverValid(value)
						? `Enter a vaild new version. E.g. major.minor.patch i.e. 1.3.2.`
						: true;
				}
			})
		);
		handleError(`VERSION`, errVersion);
		await shouldCancel(releaseVersion);
		const newVersion = releaseVersion.releaseVersion;
		console.log('newVersion: ', newVersion);

		// Set it.
		await setPluginVersion(newVersion);
		await gitPluginRelease(newVersion);
		didRelease = true;
	}
	return didRelease;
};
