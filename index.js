#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const meow = require('meow');
const cliA11y = require('cli-a11y');
const welcome = require('cli-welcome');
const logSymbols = require('log-symbols');
const promptClone = require('./utils/promptClone.js');
const promptCustom = require('./utils/promptCustom.js');
const promptTagRelease = require('./utils/promptTagRelease.js');
const promptTestedUpto = require('./utils/promptTestedUpto.js');
const printTestedUptoVersion = require('./utils/printTestedUptoVersion.js');
const verValid = require('./utils/verValid.js');
const getCustomVersion = require('./utils/getCustomVersion.js');
const setTestedUptoVersion = require('./utils/setTestedUptoVersion.js');
const getWPVersion = require('./utils/getWPVersion.js');
const setPluginVersion = require('./utils/setPluginVersion.js');
const updateNotifier = require('update-notifier');
const pkgJSON = require('./package.json');
const handleError = require('cli-handle-error');
const chalk = require('chalk');
const green = chalk.bold.green;
const yellow = chalk.bold.yellow;
const dim = chalk.dim;

const cli = meow(
	`
	Usage
	  ${green(`wp-release-it`)}

	Options
	  --latest, -l  Update "Tested up to" to the latest WordPress version.
	  --custom, -c  Update "Tested up to" to a custom WordPress version.
	  --tag,    -t  Release a new version of the WordPress plugin.

	Example
	  ${green(`wp-release-it`)} ${yellow(`--latest`)}
	  ${green(`wp-release-it`)} ${yellow(`-l`)}
	  ${green(`wp-release-it`)} ${yellow(`--custom`)} 5.4.0
	  ${green(`wp-release-it`)} ${yellow(`-c`)} 5.4.0
	  ${green(`wp-release-it`)} ${yellow(`--tag`)} 1.5.2
	  ${green(`wp-release-it`)} ${yellow(`-t`)} 1.5.2

	❯ You can also run multiple commands at once:
	  ${green(`wp-release-it`)} ${yellow(`--tag`)} 1.5.2 ${yellow(`-c`)} 5.4.0
	  ${green(`wp-release-it`)} ${yellow(`--tag`)} 1.5.2 ${yellow(`-l`)}
`,
	{
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			latest: {
				type: 'boolean',
				default: false,
				alias: 'l'
			},
			custom: {
				type: 'string',
				alias: 'c'
			},
			tag: {
				type: 'string',
				alias: 't'
			}
		}
	}
);

(async () => {
	init();
	welcome(
		`wp-release-it`,
		`by Awais.dev\n${dim(
			`Stargaze the repo for updates ↓\nhttps://github.com/ahmadawais/wp-release-it`
		)}`,
		{
			bgColor: `#d54e21`,
			color: `#FFFFFF`,
			bold: true,
			clear: true,
			version: `v${pkgJSON.version}`
		}
	);
	updateNotifier({
		pkg: pkgJSON,
		shouldNotifyInNpmScript: true
	}).notify({ isGlobal: true });
	const latest = cli.flags.latest;
	const customVersion = cli.flags.custom;
	const tag = cli.flags.tag;

	// Power mode.
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

	if (tag) {
		await verValid(tag);
		await setPluginVersion(tag);
	}

	// Interactive mode.
	if (!latest && !customVersion && !tag) {
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
