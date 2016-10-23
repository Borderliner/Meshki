# [Meshki](http://meshki.borderliner.ir/)
[![npm](https://img.shields.io/npm/dm/meshki.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/meshki)
[![GitHub tag](https://img.shields.io/github/tag/borderliner/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/releases)
[![npm](https://img.shields.io/npm/l/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md)

[![Twitter Follow](https://img.shields.io/twitter/follow/meshki_ui.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/Meshki_UI)

Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.<br>
It is only <b>~16 KiB</b> (minified) and ~40 KiB (normal), including both CSS and JS files.<br>
Check out <http://meshki.borderliner.ir/> for samples and details.

## Getting started

There are a couple ways to download Meshki:
- [Download the zip](https://github.com/Borderliner/Meshki/archive/v1.2.3.zip) or [the tar.gz](https://github.com/Borderliner/Meshki/archive/v1.2.3.tar.gz)
- Clone the repo: `git clone https://github.com/Borderliner/Meshki.git` (Note: this is under active development, so if you're looking for stable and safe, use the zipped download)<br>
You can also download it via `bower install meshki --save`

### How to compile
You need node.js to minify the source CSS and JavaScript files and produce outputs. Head over to [nodejs.org](https://nodejs.org/en/) and download a version for your system, or download it from your package manager. Next, install `Grunt` with this command:

`npm install -g grunt-cli`<br>
You may need to access root user to install node packages globally.

Then `cd` into the root folder of the project, issue the command `npm install` to install development dependencies. After that, run the command `npm run compile`. This will produce files for you in the `dist` folder, which includes both minified and normal versions of Meshki, plus a fonts folder which includes Open Sans Regular font. You can also run `npm run watch` (or `grunt watch`) to watch source files for change, and compile them automatically if there has been a change recently.

Ruby programmers can also `cd` into the project folder, and issue `bundle install` command, followed by `bundle exec rake`, to compile and minify source codes. Make sure that you have `uglifyjs` installed and is in your $PATH. If not, install it with `sudo npm install -g uglifyjs`. Note that Grunt and Rake generate different outputs, so the sizes may vary. Meshki generates outputs using Grunt.

### What's in the download?

The download includes Meshki's CSS, Meshki's JavaScript, Normalize CSS as a reset, a sample favicon, and an index.html as a starting point.

```
Meshki/
├── dist/
│   ├── fonts/
│   │   └── OpenSans-Regular.ttf
│   ├── meshki.css
│   ├── meshki.min.css
│   ├── meshki.js
│   └── meshki.min.js
├── src/
│   ├── css/
│   │   ├── normalize.css
│   │   ├── meshki.css
│   │   └── *.css
│   ├── fonts/
│   │   └── OpenSans-Regular.ttf
│   ├── images/
│   │   └── favicon.ico
│   └── js/
│       └── meshki.js
└

```

### Why it's awesome

Meshki is lightweight, stylish and simple. It styles only raw HTML elements (with a few exceptions) and provides a responsive grid with a minimal and clean interface.
- Around 1.6k lines of CSS unminified and with comments
- Although it's not a UI framework, you can create most of the interface just with Meshki
- No compiling or installing needed. Just 2 files of CSS + JS
- Can be installed via `bower` and `npm` (`bower install meshki` and `npm install meshki`)
- Clean code, clean interface, without any headaches


## Browser support

- Chrome & Chromium (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Opera (latest)
- Safari (latest)
- IE 9+ (No animations on IE 9. Do not open issues regarding IE 8 and below)

The above list is non-exhaustive. Meshki works perfectly with almost all older versions of the browsers above, though IE certainly has large degradation prior to IE 9.

## Major Known Issues
- I once saw very bad rendering on a low resolution laptop. It's probably nothing I can do about, but report any issues related to bad font rendering. I recently changed it to Open Sans, which is very clean and well-tested.
- On tablets, opening the push slider sometimes messes up the button-couples. Will find a workaround in the future release.

## Tools Used

Meshki has been developed on a GNU/Linux system (Arch Linux and Ubuntu), using a free version of [Sublime Text 3](https://www.sublimetext.com/3), [GNU Emacs](https://www.gnu.org/s/emacs) and the lovely [Atom Editor](https://atom.io/). Meshki uses tons of ideas I found over the Internet, and they were all customized to satisfy Meshki's needs. The source code is hosted on [GitHub](https://github.com/) and uses [Git](https://git-scm.com/) as the Version Control System, and [SmartGit 8](https://www.syntevo.com/smartgit/) as a Git GUI. GruntJS is also used for task automations.

## License

All parts of Meshki are free to use and abuse under the [open-source MIT license](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md).<br>
All other non-Meshki codes have their own licenses. Check out their repositories for more information.
The website of [Meshki](http://meshki.borderliner.ir) uses [font-awesome](http://fontawesome.io/)

## Acknowledgement

[Meshki](http://meshki.borderliner.ir) started by Mohammad Reza Hajianpour as a fork of [Skeleton](https://github.com/dhg/Skeleton). Although it has changed a lot, and Meshki has experienced a total overhaul.<br>
Skeleton was created by [Dave Gamache](https://twitter.com/dhg).
