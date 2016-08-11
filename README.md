# [Meshki](http://meshki.borderliner.ir/)
Meshki is a simple, black-colored, responsive boilerplate to kickstart any responsive project.<br>
It is only <b>11.6 KiB</b> (minified) and 25.3 KiB (normal), including both CSS and JS files.<br>
Check out <http://meshki.borderliner.ir/> for samples and details.

## Getting started

There are a couple ways to download Meshki:
- [Download the zip](https://github.com/Borderliner/Meshki/archive/v0.4.0.zip) or [the tar.gz](https://github.com/Borderliner/Meshki/archive/v0.4.0.tar.gz)
- Clone the repo: `git clone https://github.com/Borderliner/Meshki.git` (Note: this is under active development, so if you're looking for stable and safe, use the zipped download)<br>
You can also download it via `bower install meshki --save`

### How to compile
You need node.js to minify the source CSS and JavaScript files and produce outputs. Head over to [nodejs.org](https://nodejs.org/en/) and download a version for your system, or download it from your package manager. Next, install `Grunt` with this command:

`npm install -g grunt-cli`<br>
You may need to access root user to install node packages globally.

Then `cd` into the root folder of the project, and run the command `npm run compile`. This will produce files for you in the `dist` folder, which includes both minified and normal versions of Meshki, plus a fonts folder which includes Raleway Regular font.

### What's in the download?

The download includes Meshki's CSS, Meshki's JavaScript, Normalize CSS as a reset, a sample favicon, and an index.html as a starting point.

```
Meshki/
├── dist/
│   ├── fonts/
│   │   └── Raleway-Regular.ttf
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
│   ├── images/
│   │   └── favicon.ico
│   └── js/
└──

```

### Why it's awesome

Meshki is lightweight, stylish and simple. It styles only raw HTML elements (with a few exceptions) and provides a responsive grid with a minimal and clean interface.
- Around 1k lines of CSS unminified and with comments
- Although it's not a UI framework, you can create most of the interface with just Meshki
- No compiling or installing. Just 2 files of CSS + JS
- Can be installed via `bower` and `npm`
- Clean code, clean interface, without any headaches


## Browser support

- Chrome latest
- Firefox latest
- Opera latest
- Safari latest
- IE latest (Older versions are not guaranteed to work)

The above list is non-exhaustive. Meshki works perfectly with almost all older versions of the browsers above, though IE certainly has large degradation prior to IE9.


## License

All parts of Meshki are free to use and abuse under the [open-source MIT license](https://github.com/Borderliner/Meshki/blob/master/LICENSE.md).<br>
All other non-Meshki codes have their own licenses. Check out their repositories for more information.

## Acknowledgement

[Meshki](http://meshki.borderliner.ir) started by Mohammad Reza Hajianpour as a fork of [Skeleton](https://github.com/dhg/Skeleton). Although it has changed a lot, and Meshki has experienced a total overhaul.<br>
Skeleton was created by [Dave Gamache](https://twitter.com/dhg).
