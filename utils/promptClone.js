const exitClone = require('./exitClone.js');
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { Toggle } = require('enquirer');
const to = require('await-to-js').default;

module.exports = async () => {
	const promptClone = new Toggle({
		name: `clone`,
		message: `Are you running this in the root directory of your WordPress plugin's GitHub repo clone?`
	});

	const [errClone, clone] = await to(promptClone.run());
	handleError(`FAILED ON CLONE`, errClone);
	await shouldCancel(clone);
	exitClone(clone);
};
