const ora = require('ora');
const spinner = ora({ text: '' });
const exitClone = require('./exitClone');
const handleError = require('cli-handle-error');
const gitP = require('simple-git/promise');
const git = gitP(process.cwd());
const chalk = require('chalk');
const green = chalk.bold.green;
const yellow = chalk.bold.yellow;

module.exports = async version => {
	try {
		const isGitRepo = await git.checkIsRepo();
		if (!isGitRepo) {
			exitClone(false);
		}

		// Commit, Tag, Push.
		spinner.start(`${yellow(`PUSHING`)} the git commit`);
		const msg = `🚀 RELEASE: ${version}`;
		await git.add('.');
		await git.commit(msg);
		await git.addAnnotatedTag(version, msg);
		await git.push('origin', 'master', { '--follow-tags': null });
		spinner.succeed(`${green(`PUSHED`)} the git commit`);
	} catch (error) {
		handleError(`GIT FAILED`, error);
	}
};
