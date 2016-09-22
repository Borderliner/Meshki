# [Meshki](http://meshki.borderliner.ir/)
[![npm](https://img.shields.io/npm/dm/meshki.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/meshki)
[![GitHub tag](https://img.shields.io/github/tag/borderliner/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/releases)
[![npm](https://img.shields.io/npm/l/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md)

[![Twitter Follow](https://img.shields.io/twitter/follow/meshki_ui.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/Meshki_UI)

Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.<br>
It is only <b>~15 KiB</b> (minified) and ~36 KiB (normal), including both CSS and JS files.<br>
Check out <http://meshki.borderliner.ir/> for samples and details.

## Getting started

There are a couple ways to download Meshki:
- [Download the zip](https://github.com/Borderliner/Meshki/archive/v1.2.1.zip) or [the tar.gz](https://github.com/Borderliner/Meshki/archive/v1.2.1.tar.gz)
- Clone the repo: `git clone https://github.com/Borderliner/Meshki.git` (Note: this is under active development, so if you're looking for stable and safe, use the zipped download)<br>
You can also download it via `bower install meshki --save`

### How to compile
You need node.js to minify the source CSS and JavaScript files and produce outputs. Head over to [nodejs.org](https://nodejs.org/en/) and download a version for your system, or download it from your package manager. Next, install `Grunt` with this command:

`npm install -g grunt-cli`<br>
You may need to access root user to install node packages globally.

Then `cd` into the root folder of the project, and run the command `npm run compile`. This will produce files for you in the `dist` folder, which includes both minified and normal versions of Meshki, plus a fonts folder which includes Open Sans Regular font. You can also run `npm run watch` to watch source files for change, and compile them automatically if there has been a change recently.

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
- Can be installed via `bower` and `npm`
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
- I once saw very bad rendering on a low resolution laptop. It's probably nothing I can do about. Report any issues with bad font rendering. I recently changed it to Open Sans, which is very clean and well-tested.

## License

All parts of Meshki are free to use and abuse under the [open-source MIT license](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md).<br>
All other non-Meshki codes have their own licenses. Check out their repositories for more information.
The website of [Meshki](http://meshki.borderliner.ir) uses [font-awesome](http://fontawesome.io/)

## Acknowledgement

[Meshki](http://meshki.borderliner.ir) started by Mohammad Reza Hajianpour as a fork of [Skeleton](https://github.com/dhg/Skeleton). Although it has changed a lot, and Meshki has experienced a total overhaul.<br>
Skeleton was created by [Dave Gamache](https://twitter.com/dhg).
