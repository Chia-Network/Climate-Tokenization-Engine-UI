# Climate Tokenization Engine User Interface

User interface for the [Climate Tokenization Engine](https://github.com/Chia-Network/Climate-Tokenization-Engine).  Intended to be run as a desktop application and connect to the [Climate Tokenization Engine](https://github.com/Chia-Network/Climate-Tokenization-Engine) API running either locally or remotely.  

## Related Projects

* [Chia Blockchain](https://github.com/Chia-Network/chia-blockchain)
* [Climate Tokenization Engine](https://github.com/Chia-Network/Climate-Tokenization-Engine)
* [Climate Explorer](https://github.com/Chia-Network/climate-token-driver)
* [Chia Climate Tokenization](https://github.com/Chia-Network/climate-token-driver)
* [Climate Explorer UI](https://github.com/Chia-Network/climate-explorer-ui)
* [Climate Wallet](https://github.com/Chia-Network/Climate-Wallet)
* [Climate Action Data Trust](https://github.com/Chia-Network/cadt)
* [Climate Action Data Trust UI](https://github.com/Chia-Network/cadt-ui)

## Installation

Packages are available for Windows, Mac, and Debian-based Linux distribution on the [releases](https://github.com/Chia-Network/Climate-Tokenization-Engine-UI/releases) page.  

### Using APT on Debian-based Linux Distros (Ubuntu, Mint, etc)

The Climate Tokenization Engine UI can be installed with `apt`.

1. Start by updating apt and allowing repository download over HTTPS:

```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

2.  Add Chia's official GPG Key (if you have installed Chia with `apt`, you'll have this key already and will get a message about overwriting the existing key, which is safe to do):

```
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg
```

3. Use the following command to setup the repository.

```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/climate-tokenization/debian/ stable main" | sudo tee /etc/apt/sources.list.d/climate-tokenization.list > /dev/null
```

4.  Install the Climate Tokenization Engine UI

```
sudo apt-get update
sudo apt-get install climate-tokenization-engine-ui
```

5.  Run the Climate Explorer UI from your OS launcher or at the command line with `climate-tokenization-engine-ui`. 

## Developer Guide

### Installation From Source

```
npm install -g react-scripts
git clone git@github.com:Chia-Network/Climate-Portal-UI
cd Climate-Portal-Ui
nvm install 18.16.0
nvm use 18.16.0
npm install foreman -g
npm install -g husky
npm install -g prettier
npm install -g lint-staged
npm install -g git-authors-cli
npm set-script prepare "husky install"
npm run prepare

// If you are on linux or mac run
chmod ug+x .husky/*
chmod ug+x .git/hooks/*

npm run start
```

#### Prerequisites

You'll need:

- Git
- [nvm](https://github.com/nvm-sh/nvm)

This app uses `nvm` to align node versions across development, CI and production. If you're working on Windows you should consider [nvm-windows](https://github.com/coreybutler/nvm-windows)

### Contributing

Upon your first commit, you will automatically be added to the package.json file as a contributor.

#### Commiting

[Signed commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) are required. 

This repo uses a commit convention. A typical commit message might read:

```
    fix: correct home screen layout
```

The first part of this is the commit "type". The most common types are "feat" for new features, and "fix" for bugfixes. Using these commit types helps us correctly manage our version numbers and changelogs. Since our release process calculates new version numbers from our commits it is very important to get this right.

- `feat` is for introducing a new feature
- `fix` is for bug fixes
- `docs` for documentation only changes
- `style` is for code formatting only
- `refactor` is for changes to code which should not be detectable by users or testers
- `perf` is for a code change that improves performance
- `test` is for changes which only touch test files or related tooling
- `build` is for changes which only touch our develop/release tools
- `ci` is for changes to the continuous integration files and scripts
- `chore` is for changes that don't modify code, like a version bump
- `revert` is for reverting a previous commit

After the type and scope there should be a colon.

The "subject" of the commit follows. It should be a short indication of the change. The commit convention prefers that this is written in the present-imperative tense.

#### Commit linting

Each time you commit the message will be checked against these standards in a pre-commit hook. Additionally all the commits in a PR branch will be linted before it can be merged to master.

#### Branch Layout

All pull requests should be made against the `develop` branch.  Commits to the `main` branch will trigger a release, so the `main` branch is always the code in the latest release.
