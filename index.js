#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED ERROR`, err);
});

const meow = require('meow');
const cliA11y = require('cli-a11y');
const logSymbols = require('log-symbols');
const promptClone = require('./utils/promptClone.js');
const promptCustom = require('./utils/promptCustom.js');
const printCurrentVersion = require('./utils/printCurrentVersion.js');
const verValid = require('./utils/verValid.js');
const getCustomVersion = require('./utils/getCustomVersion.js');
const setVersion = require('./utils/setVersion.js');
const getWPVersion = require('./utils/getWPVersion.js');
const setPluginVersion = require('./utils/setPluginVersion.js');
const updateNotifier = require('update-notifier');
const pkgJSON = require('./package.json');
const handleError = require('cli-handle-error');
const welcome = require('cli-welcome');
const chalk = require('chalk');
const green = chalk.bold.green;
const dim = chalk.dim;

const cli = meow(
	`
	Usage
	  ${green(`wp-release-it`)}

	Options
	  --latest, -l  Update to latest WordPress version.
	  --custom, -c  Update to a custom WordPress version.
	  --tag,    -t  Release a new version of the WordPress plugin.

	Example
	  ${green(`wp-release-it`)}
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
		await printCurrentVersion();
		const wpVersion = await getWPVersion();
		await setVersion(wpVersion);
	}

	if (customVersion) {
		await printCurrentVersion();
		await verValid(customVersion);
		await setVersion(customVersion);
	}

	if (tag) {
		await verValid(tag);
		await setPluginVersion(tag);
	}

	// Interactive mode.
	if (!latest && !customVersion && !tag) {
		cliA11y({ toggle: true });
		await promptClone();
		await printCurrentVersion();
		const custom = await promptCustom();

		if (custom) {
			const newVersion = await getCustomVersion();
			await setVersion(newVersion);
		}

		if (!custom) {
			const wpVersion = await getWPVersion();
			await setVersion(wpVersion);
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
