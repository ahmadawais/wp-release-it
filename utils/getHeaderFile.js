const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

/**
 * Automatically gets path/to/header for plugin or theme.
 *
 * If file is left empty then it will check to try and determine the right
 * file for a plugin or theme. Search happens like this:
 *
 * 1. Use path/to/file.ext provided externally.
 * 2. Check if project root contains plugin file, ie plugin-name/plugin-name.php
 * 3. Check if project root contains style.css file, ie theme-name/style.css
 *
 * @param {String} file (Optional) Path to file.
 */
module.exports = async () => {
	const dir = process.cwd();
	const file = dir && dir + path.sep + path.basename(dir) + '.php';
	let filename = path.basename(dir) + '.php';
	await fsPromises
		.access(file, fs.constants.W_OK | fs.constants.R_OK)
		.catch(() => (filename = `style.css`));
	return filename;
};
