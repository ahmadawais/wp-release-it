const pkgJSON = require('./../package.json');
const welcome = require('cli-welcome');
const chalk = require('chalk');
const dim = chalk.dim;

module.exports = () => {
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
};
