#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const cliA11y = require('cli-a11y');
const welcome = require('cli-welcome');
const logSymbols = require('log-symbols');
const inc = require('semver/functions/inc');
const promptClone = require('./utils/promptClone.js');
const promptCustom = require('./utils/promptCustom.js');
const promptTagRelease = require('./utils/promptTagRelease.js');
const promptTestedUpto = require('./utils/promptTestedUpto.js');
const getPluginVersion = require('./utils/getPluginVersion.js');
const printTestedUptoVersion = require('./utils/printTestedUptoVersion.js');
const verValid = require('./utils/verValid.js');
const getCustomVersion = require('./utils/getCustomVersion.js');
const setTestedUptoVersion = require('./utils/setTestedUptoVersion.js');
const getWPVersion = require('./utils/getWPVersion.js');
const setPluginVersion = require('./utils/setPluginVersion.js');
const gitPluginRelease = require('./utils/gitPluginRelease.js');
const updateNotifier = require('update-notifier');
const pkgJSON = require('./package.json');
const handleError = require('cli-handle-error');
const cli = require('./utils/cli.js');
const chalk = require('chalk');
const green = chalk.bold.green;
const dim = chalk.dim;

(async () => {
	welcome(
		`wp-release-it`,
		`by Awais.dev\n${dim(
			`Stargaze the repo for updates ↓\nhttps://github.com/ahmadawais/wp-release-it`
		)}`,
		{
			bgColor: `#d54e21`,
			color: `#FFFFFF`,
			bold: true,
			clear: false,
			version: `v${pkgJSON.version}`
		}
	);
	updateNotifier({
		pkg: pkgJSON,
		shouldNotifyInNpmScript: true
	}).notify({ isGlobal: true });
	const [command] = cli.input;
	const latest = cli.flags.latest;
	const customVersion = cli.flags.custom;
	const tag = cli.flags.tag;

	// Power mode.
	if (command) {
		const prev = await getPluginVersion();
		const newVersion = inc(prev, command);
		await verValid(newVersion);
		await setPluginVersion(newVersion);
		await gitPluginRelease(newVersion);
	}

	if (tag) {
		await verValid(tag);
		await setPluginVersion(tag);
		await gitPluginRelease(tag);
	}

	if (latest) {
		await printTestedUptoVersion();
		const wpVersion = await getWPVersion();
		await setTestedUptoVersion(wpVersion);
	}

	if (customVersion) {
		await printTestedUptoVersion();
		await verValid(customVersion);
		await setTestedUptoVersion(customVersion);
	}

	// Interactive mode.
	if (!latest && !customVersion && !tag && !command) {
		cliA11y({ toggle: true });
		await promptClone();
		const didRelease = await promptTagRelease();
		if (!didRelease) {
			const updateTestedUpto = await promptTestedUpto();
			if (updateTestedUpto) {
				await printTestedUptoVersion();
				const customTestedUpto = await promptCustom();

				if (customTestedUpto) {
					const newVersion = await getCustomVersion();
					await setTestedUptoVersion(newVersion);
				}

				if (!customTestedUpto) {
					const wpVersion = await getWPVersion();
					await setTestedUptoVersion(wpVersion);
				}
			}
		}
	}

	console.log(
		`${logSymbols.success} ${green(`All done!`)}\n\n${logSymbols.info} ${dim(
			`Tip: Check out `
		)}${green(`wp-continous-deployment`)}\n${dim(
			`https://github.com/ahmadawais/wp-continuous-deployment`
		)}\n`
	);
})();
