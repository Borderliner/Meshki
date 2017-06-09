/*
 * Meshki v2.0.0 (https://borderliner.github.io/Meshki/)
 * Copyright 2017 Mohammadreza Hajianpour <hajianpour.mr@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Disable no-console error, since this file runs on Node.js platform
/* eslint no-console: off */

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const sass = require('node-sass');
const uglifyJS = require('uglify-js');

const options = {
  main_scss: 'src/scss/main.scss',
  main_js: 'src/js/meshki.js',
  main_fonts: 'src/fonts/',
  output_dir: 'dist/',
  output_css: 'dist/css/meshki.css',
  output_css_min: 'dist/css/meshki.min.css',
  output_js: 'dist/js/meshki.js',
  output_js_min: 'dist/js/meshki.min.js',
  output_fonts: 'dist/fonts/',
  plugins_dir: 'src/scss/plugins',
  source_map: true,
  licensed: [
    'dist/js/meshki.min.js',
    'dist/css/meshki.min.css',
    'dist/plugins/meshki-extra-button-colors.min.css',
    'dist/plugins/meshki-rtl.min.css',
  ],
};

function listDirectory(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
}

function removeDirectory(srcpath) {
  if (fs.existsSync(srcpath)) {
    fs.readdirSync(srcpath).forEach((file) => {
      const currentPath = `${srcpath}/${file}`;
      if (fs.lstatSync(currentPath).isDirectory()) {
        removeDirectory(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(srcpath);
  }
}

function createDist() {
  if (!fs.existsSync('dist/')) {
    console.log('No "dist" folder exists. Creating folders...'.yellow);
    fs.mkdirSync('dist/');
    fs.mkdirSync('dist/plugins/');
    fs.mkdirSync('dist/fonts/');
    fs.mkdirSync('dist/css/');
    fs.mkdirSync('dist/js/');
    console.log('=> "dist" folder was created successfully!'.green);
  } else {
    console.log('Cleaning previously compiled files...'.yellow);
    removeDirectory('dist/');
    createDist();
  }
}

const plugins = listDirectory(options.plugins_dir);

function sassifyMeshki() {
  console.log('Compiling Meshki...'.yellow);
  const result = sass.renderSync({
    file: options.main_scss,
    outFile: options.output_css,
  });
  // Write CSS file
  try {
    fs.writeFileSync(options.output_css, result.css);
    console.log('=> Successfully compiled Meshki'.green);
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
  }
}

function minifyMeshki() {
  console.log('Minifying Meshki...'.yellow);
  const result = sass.renderSync({
    file: options.main_scss,
    outputStyle: 'compressed',
    outFile: options.output_css_min,
    sourceMap: options.source_map,
  });
  // Write Minified CSS file
  try {
    fs.writeFileSync(options.output_css_min, result.css);
    console.log('=> Successfully minified Meshki'.green);
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
  }

  if (options.source_map) {
    // Write SourceMaps
    try {
      fs.writeFileSync(`${options.output_css}.map`, result.map);
      console.log('=> Successfully generated source maps for Meshki'.green);
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    }
  }
}

function sassifyPlugins() {
  console.log('Starting to compile plugins...'.blue);
  plugins.forEach((name) => {
    console.log('Compiling '.yellow + `${name}`.blue);
    const result = sass.renderSync({
      file: `${options.plugins_dir}/${name}/main.scss`,
      outFile: `${options.output_dir}/plugins/`,
    });
    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.css`, result.css);
      console.log(`=> Successfully compiled ${name}`.green);
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }
  });
}

function minifyPlugins() {
  console.log('Starting to minify plugins...'.blue);
  plugins.forEach((name) => {
    console.log('Minifying '.yellow + `${name}`.blue);
    const result = sass.renderSync({
      file: `${options.plugins_dir}/${name}/main.scss`,
      outFile: `${options.output_dir}/plugins/`,
      outputStyle: 'compressed',
      sourceMap: options.source_map,
    });

    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.min.css`, result.css);
      console.log(`=> Successfully minified ${name}`.green);
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }

    if (options.source_map) {
      // Write source map file
      try {
        fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.map`, result.map);
        console.log(`=> Successfully generated source map for ${name}`.green);
      } catch (error) {
        console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
        console.log(error);
      }
    }
  });
}

function uglifyJavaScript() {
  let code = '';
  let uglified = '';
  try {
    code = fs.readFileSync(options.main_js, 'utf-8');
    uglified = uglifyJS.minify(code, {
      warnings: true,
    });
    console.log(uglified.warnings);
  } catch (error) {
    console.log('Could not read the input file from the disk. Check if you have read permissions.'.red);
    console.log(error);
  }

  try {
    fs.writeFileSync(options.output_js_min, uglified.code);
    console.log('=> Successfully uglified meshki.js'.green);
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    console.log(error);
  }
}

function copyJavaScript() {
  console.log('Copying meshki.js to dist/js...'.yellow);
  try {
    fsExtra.copySync(path.resolve(__dirname, options.main_js), options.output_js);
    console.log('=> Successfully copied meshki.js to dist/js/'.green);
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    console.log(error);
  }
}

function copyFonts() {
  console.log('Copying fonts to dist/fonts...'.yellow);
  fs.readdirSync(options.main_fonts).forEach((file) => {
    try {
      fsExtra.copySync(`${__dirname}/${options.main_fonts}${file}`, `${options.output_fonts}${file}`);
      console.log(`=> Successfully copied ${file.blue} to dist/fonts/`.green);
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }
  });
}

function copyLicense() {
  let copying = '';
  try {
    copying = fs.readFileSync('COPYING', 'utf-8');
    console.log(copying);
  } catch (error) {
    console.log(error);
  }

  options.licensed.forEach((file) => {
    try {
      const fileContent = fs.readFileSync(file, 'utf-8');
      fs.writeFileSync(file, `${copying}\n${fileContent}`);
    } catch (error) {
      console.log(error);
    }
  });
}

createDist();
sassifyMeshki();
minifyMeshki();
sassifyPlugins();
minifyPlugins();
uglifyJavaScript();
copyJavaScript();
copyFonts();
copyLicense();
