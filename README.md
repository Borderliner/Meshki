# [Meshki](https://borderliner.github.io/Meshki/)
[![npm](https://img.shields.io/npm/dm/meshki.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/meshki)
[![GitHub tag](https://img.shields.io/github/tag/borderliner/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/releases)
[![npm](https://img.shields.io/npm/l/meshki.svg?maxAge=2592000?style=flat-square)](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md)

[![Twitter Follow](https://img.shields.io/twitter/follow/meshki_ui.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/Meshki_UI)

## Meshki is being re-written using [Sass](http://sass-lang.com/). Take a look at [`sass-dev`](https://github.com/Borderliner/Meshki/tree/sass-dev) branch.

![Meshki Banner](https://borderliner.github.io/Meshki/meta-image.png)

Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.<br>
It is only <b>~17 KiB</b> (minified) and ~40 KiB (normal), including both CSS and JS files.<br>
Check out <https://borderliner.github.io/Meshki/> for samples and details.

## Getting Started

There are a couple ways to download Meshki:
- [Download the zip](https://github.com/Borderliner/Meshki/archive/v1.5.1.zip) or [the tar.gz](https://github.com/Borderliner/Meshki/archive/v1.5.1.tar.gz)
- Clone the repo: `git clone https://github.com/Borderliner/Meshki.git` (Note: this is under active development, so if you're looking for stable and safe, use the zipped download)
- Use Bower: `bower install meshki` **(Recommended)**
- Use npm: `npm install meshki`

### How to Compile
You need node.js to minify the source CSS and JavaScript files and produce outputs. Head over to [nodejs.org](https://nodejs.org/en/) and download a version for your system, or download it from your package manager. Next, install `Grunt` with this command:

`npm install -g grunt-cli`<br>
You may need to access root user to install node packages globally.

Then `cd` into the root folder of the project, issue the command `npm install` to install development dependencies. After that, run the command `npm run compile`. This will produce files for you in the `dist` folder, which includes both minified and normal versions of Meshki, plus a fonts folder which includes Open Sans Regular font. You can also run `npm run watch` (or `grunt watch`) to watch source files for change, and compile them automatically if there has been a change recently.

### What's in the package?

The package includes Meshki's CSS, Meshki's JavaScript, Normalize CSS as a reset, a sample favicon, and an index.html as a starting point.

```
Meshki
├── dist
│   ├── fonts
│   │   └── yekan.ttf
│   ├── meshki.css
│   ├── meshki.js
│   └── plugins
│       ├── button-colors.css
│       └── rtl.css
└── src
    ├── css
    │   ├── base
    │   │   ├── button.css
    │   │   ├── code.css
    │   │   ├── footer.css
    │   │   ├── form.css
    │   │   ├── grid.css
    │   │   ├── list.css
    │   │   ├── meshki.css
    │   │   ├── navbar.css
    │   │   ├── normalize.css
    │   │   ├── sidenav.css
    │   │   ├── table.css
    │   │   ├── typography.css
    │   │   └── utility.css
    │   └── plugins
    │       ├── button-colors.css
    │       └── rtl.css
    └── js
        └── meshki.js

```

### Why Meshki is Awesome

Meshki is lightweight, stylish and simple. It styles only raw HTML elements (with a few exceptions) and provides a responsive grid with a minimal and clean interface.
- Around 1.6k lines of unminified CSS, with comments
- Although it's not a UI framework, you can create most of the interface just with Meshki
- No compilation or installation needed. Just 2 files of CSS + JS
- Can be installed via `bower` and `npm` (`bower install meshki` and `npm install meshki`)
- Available through [CloudFlare](https://cdnjs.com/libraries/meshki) and [jsDelivr](https://www.jsdelivr.com/projects/meshki) CDNs
- Clean code, clean interface, without any headaches
- Dependency-free! You don't need jQuery to run Meshki. All pure JavaScript


## Browser Support

- Chrome & Chromium (latest) **Well-Tested**
- Mozilla Firefox (latest) **Well-Tested**
- Microsoft Edge (latest)
- Opera (latest)
- Safari (latest) **Well-Tested**
- IE 9+ (No animations on IE 9. Do not open issues regarding IE 8 and below) **Change Your Browser, Please!**

The above list is non-exhaustive. Meshki works perfectly with almost all older versions of the browsers above, though IE certainly has large degradation prior to IE 9.

## Major Known Issues
- Slider is somehow messed up on IE and Microsot Edge. Will be fixed soon.

## Tools Used

Meshki has been developed on a GNU/Linux system (Arch Linux and Ubuntu), using a free version of [Sublime Text 3](https://www.sublimetext.com/3), [GNU Emacs](https://www.gnu.org/s/emacs) and the lovely [Atom Editor](https://atom.io/). Meshki uses tons of ideas I found over the Internet, and they were all customized to satisfy Meshki's needs. The source code is hosted on [GitHub](https://github.com/) and uses [Git](https://git-scm.com/) as the Version Control System, and [SmartGit 8](https://www.syntevo.com/smartgit/) as a Git GUI. GruntJS is also used for task automations.

## License

All parts of Meshki are free to use and abuse under the [open-source MIT license](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md).<br>
All other non-Meshki codes have their own licenses. Check out their repositories for more information.
The website of [Meshki](https://borderliner.github.io/Meshki/) uses [font-awesome](http://fontawesome.io/)

## Acknowledgement

[Meshki](https://borderliner.github.io/Meshki/) started by [Mohammadreza Hajianpour](mailto:hajianpour.mr@gmail.com) as a fork of [Skeleton](https://github.com/dhg/Skeleton). Although it has changed a lot, and Meshki has experienced a total overhaul.<br>
Skeleton was created by [Dave Gamache](https://twitter.com/dhg).
