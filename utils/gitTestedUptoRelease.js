const exitClone = require('./exitClone');
const handleError = require('cli-handle-error');
const gitP = require('simple-git/promise');
const git = gitP(process.cwd());

module.exports = async version => {
	try {
		const isGitRepo = await git.checkIsRepo();
		if (!isGitRepo) {
			exitClone(false);
		}

		// Commit, Tag, Push.
		const msg = `📦 NEW: Tested up to ${version}`;
		await git.add('.');
		await git.commit(msg);
		await git.push('origin', 'master', { '--follow-tags': null });
	} catch (error) {
		handleError(`GIT FAILED`, error);
	}
};
