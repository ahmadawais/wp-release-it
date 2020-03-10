const chalk = require('chalk');
const yellow = chalk.bold.yellow;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { Toggle } = require('enquirer');
const to = require('await-to-js').default;

module.exports = async () => {
	const [errCustom, custom] = await to(
		new Toggle({
			name: `custom`,
			message: `Define a custom "Tested up to" version ${yellow(`OR`)} set to the latest WordPress version?`,
			enabled: `Custom Ver`,
			disabled: `WordPress Ver`
		}).run()
	);
	handleError(`FAILED ON CUSTOM`, errCustom);
	await shouldCancel(custom);

	return custom ? true : false;
};
