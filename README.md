# [Meshki](https://borderliner.github.io/Meshki/)
[![npm](https://img.shields.io/npm/dm/meshki.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/meshki)
[![GitHub tag](https://img.shields.io/github/tag/borderliner/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/releases)
[![npm](https://img.shields.io/npm/l/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/blob/master/LICENSE)

Say hi to Meshki on Twitter!<br>
[![Twitter Follow](https://img.shields.io/twitter/follow/meshki_ui.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/Meshki_UI)

![Meshki Banner](https://borderliner.github.io/Meshki/meta-image.png)

Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.

It is only <b>~20 KiB</b> (minified) and ~30 KiB (normal), including both Scss/CSS and JS files.

Check out <https://borderliner.github.io/Meshki/> for samples and details.

- [Meshki](#meshki)
- [Getting Started (for users)](#getting-started-for-users)
- [Build (for developers and contributors)](#build-for-developers-and-contributors)
  - [Clone the repo:](#clone-the-repo)
  - [Install Dependencies](#install-dependencies)
    - [**npm** or [**yarn**](https://yarnpkg.com/)](#npm-or-yarn)
- [Why Meshki is Awesome](#why-meshki-is-awesome)
- [Browser Support](#browser-support)
- [Known Issues and Roadmap](#known-issues-and-roadmap)
- [Tools Used](#tools-used)
- [License](#license)
- [Acknowledgement](#acknowledgement)

# Getting Started (for users)

There are a couple ways to get Meshki (choose only one):
1. **Download the package**: [**as .zip**](https://api.github.com/repos/Borderliner/Meshki/zipball) (bigger, common) or [**as .tar.gz**](https://api.github.com/repos/Borderliner/Meshki/tarball) (smaller, uncommon)
2. **Use CDN**: Link Meshki directly into your project with `<link>` and `<script>` tags. Meshki is hosted on two famous content delivery networks:
   * [**cdnjs**: https://cdnjs.com/libraries/meshki](https://cdnjs.com/libraries/meshki)
   * [**jsDelivr**: https://www.jsdelivr.com/projects/meshki](https://www.jsdelivr.com/projects/meshki)
3. **Clone the repo**: Open a console and issue (without $):
   
   `$ git clone https://github.com/Borderliner/Meshki.git`
   
   **Note**: Meshki is always under active development, so if you're looking for a stable and safe release, use the compressed packages. *Cloning the repo is needed only if you want to contribute to the project.*
4. **Use Bower**: `bower install meshki` *(Not Recommended)*
5. **Use npm**: `npm install meshki` *(Not Recommended)*
<br>
<br>
# Build (for developers and contributors)
You need [Node.js](https://nodejs.org/en/) to minify the source Scss and JavaScript files and produce outputs. Download a version suitable for your system, or get it from your Operating System's package manager. 

## Clone the repo:

`git clone https://github.com/Borderliner/Meshki.git && cd Meshki`

## Install Dependencies

### [**npm**](https://www.npmjs.com/) or [**yarn**](https://yarnpkg.com/)

Install all the dependencies (don't use both):

- `npm install`
- `yarn`

To compile Meshki, the file `build.js` contains the scripts you need to compile Meshki. There are a couple of commands you can use via `npm` or `yarn` so that you don't have to use `build.js` directly.

- `npm run compile`
- `yarn run compile`

To compile and watch for file changes:

- `npm run watch`
- `yarn run watch`

Sometimes when you upgrade your NodeJS, `node-sass` needs to be recompiled for the newer version. To do so, run the following command:

- `npm run rebuild-sass`
- `yarn run rebuild-sass`
<br>
<br>
# Why Meshki is Awesome

Meshki is lightweight, stylish and minimal. It styles only raw HTML elements (with a few exceptions) and provides a responsive grid with a fresh-looking interface.

- Dependency-free! You don't need `jQuery` or other scripts to use Meshki. All pure and independent JavaScript and CSS files.
- No compilation or any specific installation needed. Just link 2 files of `meshki.min.css` and `meshki.min.js`
- Although **Meshki is not a UI framework, it's a CSS library**, you can create most of the interface with just using Meshki
- Around 1.3k lines of unminified CSS, with comments
- Can be installed via different tools: `git`, `bower`, `npm` and `yarn`
- Hosted on the most famous CDNs: [CloudFlare](https://cdnjs.com/libraries/meshki) and [jsDelivr](https://www.jsdelivr.com/projects/meshki)
- Clean code, smooth interface, easy yet professional
- Linter configurations, comments, all available for contributors

# Browser Support
Latest version of these browsers are implied:
- Chrome, Chromium, Opera, Microsoft Edge -> ***✓ Well-Tested***
- Mozilla Firefox -> ***✓ Well-Tested***
- Safari -> *No issues reported*.
- Internet Explorer 9+ -> No animations on IE 9. Do not open issues regarding IE 8 and below **Change Your Browser, Please!**

The above list is non-exhaustive. Meshki works fine with almost all older versions of the above browsers, though IE certainly has large degradation prior to IE 9, and you are advised to always keep your browser up-to-date.

# Known Issues and Roadmap
Not any production-obstructing issues are currently present. For all known issues and project roadmap, see [CHANGELOG](https://github.com/Borderliner/Meshki/blob/master/CHANGELOG.md).

# Tools Used

Meshki has been developed mainly on PC, using [VSCode](https://code.visualstudio.com) and its surrounding tools.

# License

All parts of Meshki are free to use under the permissive [Apache-2.0 License](https://github.com/Borderliner/Meshki/blob/master/LICENSE).

All other non-Meshki codes have their own respective licenses. Check out their repositories for more information.
The website of [Meshki](https://borderliner.github.io/Meshki/) uses:

- [Font Awesome](http://fontawesome.io/)
- [Open Sans font](https://fonts.google.com/specimen/Open+Sans)
- [Vazir font](https://rastikerdar.github.io/vazir-font/)
- [Prism syntax highlighter](http://prismjs.com)
- [clipboard.js](https://clipboardjs.com)

# Acknowledgement

[Meshki](https://borderliner.github.io/Meshki/) was originally started by [Mohammadreza Hajianpour](mailto:ryan.hajianpour@gmail.com) as a fork of [Skeleton](https://github.com/dhg/Skeleton). Meshki has come a long way since then and has experienced a total overhaul, including porting the codebase from CSS to Scss.
[Skeleton](https://github.com/dhg/Skeleton) was created by [Dave Gamache](https://twitter.com/dhg).

<br>
Thanks to all contributors and supporters of Meshki, you are AWESOME.
