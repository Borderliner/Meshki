# [Meshki](https://borderliner.github.io/Meshki/)
[![npm](https://img.shields.io/npm/dm/meshki.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/meshki)
[![GitHub tag](https://img.shields.io/github/tag/borderliner/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/releases)
[![npm](https://img.shields.io/npm/l/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/blob/master/LICENSE)

[![Twitter Follow](https://img.shields.io/twitter/follow/meshki_ui.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/Meshki_UI)

![Meshki Banner](https://borderliner.github.io/Meshki/meta-image.png)

Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.

It is only <b>~20 KiB</b> (minified) and ~30 KiB (normal), including both Scss/CSS and JS files.

Check out <https://borderliner.github.io/Meshki/> for samples and details.

- [Getting Started](#getting-started)
- [How to Compile](#how-to-compile)
    - [npm](#npm)
    - [Yarn](#yarn)
- [Why Meshki is Awesome](#why-meshki-is-awesome)
- [Browser Support](#browser-support)
- [Major Known Issues](#major-known-issues)
- [Tools Used](#tools-used)
- [License](#license)
- [Acknowledgement](#acknowledgement)

# Getting Started

There are a couple ways to download Meshki:
- [Download the zip](https://github.com/Borderliner/Meshki/archive/v2.0.1.zip) or [the tar.gz](https://github.com/Borderliner/Meshki/archive/v2.0.1.tar.gz)
- Clone the repo: `git clone https://github.com/Borderliner/Meshki.git` (Note: this is under active development, so if you're looking for stable and safe, use the zipped download)
- Use Bower: `bower install meshki` **(Recommended)**
- Use npm: `npm install meshki`

# How to Compile
You need node.js to minify the source Scss and JavaScript files and produce outputs. Head over to [nodejs.org](https://nodejs.org/en/) and download a version for your system, or download it from your package manager. 

Clone the repo:

`git clone https://github.com/Borderliner/Meshki.git && cd Meshki`

## npm

Install all the dependencies with npm:

`npm install`

The file `build.js` contains the scripts you need to compile Meshki. There are a couple of commands you can use via `npm run` so that you don't have to use `build.js` directly.

To compile Meshki:

`npm run compile`

To compile and watch for file changes:

`npm run watch`

Sometimes when you upgrade your NodeJS, node-sass needs to be recompiled for the new version. To do so, issue the following command:

`npm run rebuild-sass`

## Yarn

Install all the dependencies with yarn:

`yarn`

The file `build.js` contains the scripts you need to compile Meshki. There are a couple of commands you can use via `yarn run` so that you don't have to use `build.js` directly.

To compile Meshki:

`yarn run compile`

To compile and watch for file changes:

`yarn run watch`

Sometimes when you upgrade your NodeJS, node-sass needs to be recompiled for the new version. To do so, issue the following command:

`yarn run rebuild-sass`

# Why Meshki is Awesome

Meshki is lightweight, stylish and simple. It styles only raw HTML elements (with a few exceptions) and provides a responsive grid with a minimal and clean interface.
- Around 1.3k lines of unminified CSS, with comments
- Linter configurations available for geeks
- Although it's not a UI framework, you can create most of the interface with just using Meshki
- No compilation or installation needed. Just 2 files of CSS + JS
- Can be installed via `bower`, `npm` and `yarn`
- Available through [CloudFlare](https://cdnjs.com/libraries/meshki) and [jsDelivr](https://www.jsdelivr.com/projects/meshki) CDNs
- Clean code, clean interface, without any headaches
- Dependency-free! You don't need jQuery to run Meshki. All pure JavaScript

# Browser Support

- Chrome & Chromium (latest) **Well-Tested**
- Mozilla Firefox (latest) **Well-Tested**
- Microsoft Edge (latest)
- Opera (latest)
- Safari (latest) **Well-Tested**
- IE 9+ (No animations on IE 9. Do not open issues regarding IE 8 and below) **Change Your Browser, Please!**

The above list is non-exhaustive. Meshki works perfectly with almost all older versions of the browsers above, though IE certainly has large degradation prior to IE 9.

# Major Known Issues
- None yet

# Tools Used

Meshki has been developed mainly on macOS, using [Atom Editor](https://atom.io/) and [VSCode](https://code.visualstudio.com). For git GUI, [SourceTree](https://www.sourcetreeapp.com) has been used.

# License

All parts of Meshki are free to use under [Apache-2.0 License](https://github.com/Borderliner/Meshki/blob/master/LICENSE).

All other non-Meshki codes have their own licenses. Check out their repositories for more information.
The website of [Meshki](https://borderliner.github.io/Meshki/) uses:

- [Font Awesome](http://fontawesome.io/)
- [Google's Open Sans font](https://fonts.google.com/specimen/Open+Sans)
- [Prism](http://prismjs.com)
- [clipboard.js](https://clipboardjs.com)

# Acknowledgement

[Meshki](https://borderliner.github.io/Meshki/) started by [Mohammadreza Hajianpour](mailto:hajianpour.mr@gmail.com) as a fork of [Skeleton](https://github.com/dhg/Skeleton). Although it has changed a lot, and Meshki has experienced a total overhaul
Skeleton was created by [Dave Gamache](https://twitter.com/dhg).
