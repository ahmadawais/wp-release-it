<h4 align="center">
    <a href="https://github.com/ahmadawais/wp-release-it">
        <img src="./.github/logo.png" alt="wp-release-it" width="750px" />
    </a>
    <br>

[![DOWNLOADS](https://img.shields.io/npm/dt/wp-release-it?label=DOWNLOADS%20%20❯&colorA=FF5722&colorB=FF5722&style=flat)](https://www.npmjs.com/package/wp-release-it) [![Learn VSCode](https://img.shields.io/badge/-VSCODE.pro%20%E2%86%92-gray.svg?colorB=FF5722&style=flat)](https://VSCode.pro/?utm_source=GitHubFOSS)
[![Follow @MrAhmadAwais on Twitter](https://img.shields.io/badge/FOLLOW%20@MRAHMADAWAIS%20%E2%86%92-gray.svg?colorA=FF5722&colorB=FF5722&style=flat)](https://twitter.com/mrahmadawais/)

WordPress plugin release automation that works.

</h4>

<br>

# wp-release-it

- 🚀 Update your WordPress plugin version with ease.
- 🤯 Define custom version of the "Tested up to" version
- 🤖 Update the "Tested up to" version to the latest version of WordPress.

<br>

[![⚙️](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/usage.png)](./../../)

## Usage

Release a new version of your WordPress plugins or just update the `Tested up to` WordPress version.

- `--latest`, `-l` Update "Tested up to" to the latest WordPress version.
- `--custom`, `-c` Update "Tested up to" to a custom WordPress version.
- `--tag`,    `-t` Release a new version of the WordPress plugin.

```sh
# Interactive mode: Asks questions.
npx wp-release-it

# Power mode: specify the flags and run in one go.

# 1. Release a new version of the WordPress plugin.
npx wp-release-it major      # Releases a major version.      E.g. from 1.4.7 to 2.0.0
npx wp-release-it premajor   # Releases a major version.      E.g. from 1.4.7 to 2.0.0-0
npx wp-release-it minor      # Releases a minor version.      E.g. from 1.4.7 to 1.5.0
npx wp-release-it preminor   # Releases a preminor version.   E.g. from 1.4.7 to 1.5.0-0
npx wp-release-it patch      # Releases a patch version.      E.g. from 1.4.7 to 1.4.8
npx wp-release-it prepatch   # Releases a prepatch version.   E.g. from 1.4.7 to 1.4.8-0
npx wp-release-it prerelease # Releases a prerelease version. E.g. from 1.4.7 to 1.4.8-0

# 2. Or define a custom tag to release a custom version.
npx wp-release-it --tag 2.5.0
npx wp-release-it -t 2.5.0

# 3. Update the "Tested up to" version to the latest version of WordPress.
npx wp-release-it --latest
npx wp-release-it -l

# 4. Set a custom version to as the "Tested up to" version (e.g. setting 5.4.0 before its release).
npx wp-release-it --custom 5.4.0
npx wp-release-it -c 5.4.0

# 5. You can also run multiple commands at once:
npx wp-release-it -t 2.5.0 -c 5.4.0
npx wp-release-it -t 2.5.0 -l

# 6. Help/usage/version.
npx wp-release-it --help    # Prints the wp-release-it help.
npx wp-release-it --version # Prints the wp-release-it version.
```

👋 **MOAR**: I use `wp-release-it` by first setting up [`wp-continuous-deployment`](https://github.com/ahmadawais/wp-continuous-deployment). [Share feedback on Twitter →](https://twitter.com/MrAhmadAwais/)

<br>

[![📝](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/log.png)](changelog.md)

## Changelog

[❯ Read the changelog here →](changelog.md)

<br>

<small>**KEY**: `📦 NEW`, `👌 IMPROVE`, `🐛 FIX`, `📖 DOC`, `🚀 RELEASE`, and `✅ TEST`

> _I use [Emoji-log](https://github.com/ahmadawais/Emoji-Log), you should try it and simplify your git commits._

</small>

<br>

[![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)](./../../)

## License & Conduct

- MIT © [Ahmad Awais](https://twitter.com/MrAhmadAwais/)
- [Code of Conduct](code-of-conduct.md)

<br>

[![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)](./../../)

## Connect

<div align="left">
    <p><a href="https://github.com/ahmadawais"><img alt="GitHub @AhmadAwais" align="center" src="https://img.shields.io/badge/GITHUB-gray.svg?colorB=6cc644&colorA=6cc644&style=flat" /></a>&nbsp;<small><strong>(follow)</strong> To stay up to date on free & open-source software</small></p>
    <p><a href="https://twitter.com/MrAhmadAwais/"><img alt="Twitter @MrAhmadAwais" align="center" src="https://img.shields.io/badge/TWITTER-gray.svg?colorB=1da1f2&colorA=1da1f2&style=flat" /></a>&nbsp;<small><strong>(follow)</strong> To get #OneDevMinute daily hot tips & trolls</small></p>
    <p><a href="https://www.youtube.com/AhmadAwais"><img alt="YouTube AhmadAwais" align="center" src="https://img.shields.io/badge/YOUTUBE-gray.svg?colorB=ff0000&colorA=ff0000&style=flat" /></a>&nbsp;<small><strong>(subscribe)</strong> To tech talks & #OneDevMinute videos</small></p>
    <p><a href="https://AhmadAwais.com/"><img alt="Blog: AhmadAwais.com" align="center" src="https://img.shields.io/badge/MY%20BLOG-gray.svg?colorB=4D2AFF&colorA=4D2AFF&style=flat" /></a>&nbsp;<small><strong>(read)</strong> In-depth & long form technical articles</small></p>
    <p><a href="https://www.linkedin.com/in/MrAhmadAwais/"><img alt="LinkedIn @MrAhmadAwais" align="center" src="https://img.shields.io/badge/LINKEDIN-gray.svg?colorB=0077b5&colorA=0077b5&style=flat" /></a>&nbsp;<small><strong>(connect)</strong> On the LinkedIn profile y'all</small></p>
</div>

