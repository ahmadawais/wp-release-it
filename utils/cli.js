const meow = require('meow');
const chalk = require('chalk');
const green = chalk.bold.green;
const yellow = chalk.bold.yellow;
const cyan = chalk.bold.cyan;
const dim = chalk.dim;

module.exports = meow(
	`
	Usage

	  ${dim(`# Interactive mode.`)}
	  ${green(`npx wp-release-it`)}

	  ${dim(`# Power user mode.`)}
	  ${green(`npx wp-release-it`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`major`)}         Release a new major version
	  ${cyan(`minor`)}         Release a new minor version
	  ${cyan(`patch`)}         Release a new patch version
	  ${cyan(`prerelease`)}    Release a new prerelease version
	  ${cyan(`prepatch`)}      Release a new prepatch version
	  ${cyan(`premajor`)}      Release a new premajor version
	  ${cyan(`prepatch`)}      Release a new prepatch version

	Options
	  ${yellow(`--latest`)}, ${yellow(`-l`)}  Update "Tested up to" to the latest WordPress version.
	  ${yellow(`--custom`)}, ${yellow(`-c`)}  Update "Tested up to" to a custom WordPress version.
	  ${yellow(`--tag`)},    ${yellow(`-t`)}  Release a new version of the WordPress plugin.

	Examples
	  ${green(`npx wp-release-it`)} ${cyan(`major`)}
	  ${green(`npx wp-release-it`)} ${cyan(`minor`)}
	  ${green(`npx wp-release-it`)} ${yellow(`--latest`)}
	  ${green(`npx wp-release-it`)} ${yellow(`-l`)}
	  ${green(`npx wp-release-it`)} ${yellow(`--custom`)} 5.4.0
	  ${green(`npx wp-release-it`)} ${yellow(`-c`)} 5.4.0
	  ${green(`npx wp-release-it`)} ${yellow(`--tag`)} 1.5.2
	  ${green(`npx wp-release-it`)} ${yellow(`-t`)} 1.5.2

	❯ You can also run multiple options at once:
	  ${green(`npx wp-release-it`)} ${yellow(`--tag`)} 1.5.2 ${yellow(`-c`)} 5.4.0
	  ${green(`npx wp-release-it`)} ${yellow(`--tag`)} 1.5.2 ${yellow(`-l`)}
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
