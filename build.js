/*
 * Meshki v2.0.1 (https://borderliner.github.io/Meshki/)
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
/* eslint no-unused-expressions: off */

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const sass = require('node-sass');
const uglifyJS = require('uglify-js');
const watch = require('node-watch');

const isWatch = process.argv[2];

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

function createDist(log) {
  if (!fs.existsSync('dist/')) {
    log ? console.log('No '.yellow + '"dist"'.blue + ' folder exists. Creating folders...'.yellow) : undefined;
    fs.mkdirSync('dist/');
    fs.mkdirSync('dist/plugins/');
    fs.mkdirSync('dist/fonts/');
    fs.mkdirSync('dist/css/');
    fs.mkdirSync('dist/js/');
    log ? console.log('=> '.green + '"dist"'.blue + ' folder was created successfully!'.green) : undefined;
  } else {
    log ? console.log('Cleaning previously compiled files...'.yellow) : undefined;
    removeDirectory('dist/');
    createDist();
  }
}

const plugins = listDirectory(options.plugins_dir);

function sassifyMeshki(log) {
  log ? console.log('Compiling '.yellow + 'meshki.scss'.blue + '...'.yellow) : undefined;
  const result = sass.renderSync({
    file: options.main_scss,
    outFile: options.output_css,
  });
  // Write CSS file
  try {
    fs.writeFileSync(options.output_css, result.css);
    log ? console.log('=> Successfully compiled '.green + 'meshki.scss'.blue) : undefined;
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
  }
}

function minifyMeshki(log) {
  log ? console.log('Minifying '.yellow + 'meshki.css'.blue + '...'.yellow) : undefined;
  const result = sass.renderSync({
    file: options.main_scss,
    outputStyle: 'compressed',
    outFile: options.output_css_min,
    sourceMap: options.source_map,
  });
  // Write Minified CSS file
  try {
    fs.writeFileSync(options.output_css_min, result.css);
    log ? console.log('=> Successfully minified '.green + 'meshki.css'.blue) : undefined;
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
  }

  if (options.source_map) {
    // Write SourceMaps
    try {
      fs.writeFileSync(`${options.output_css}.map`, result.map);
      log ? console.log('=> Successfully generated source maps for '.green + 'meshki.min.css'.blue) : undefined;
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    }
  }
}

function sassifyPlugins(log) {
  log ? console.log('Starting to compile plugins...'.yellow) : undefined;
  plugins.forEach((name) => {
    log ? console.log('Compiling '.yellow + `${name}`.blue) : undefined;
    const result = sass.renderSync({
      file: `${options.plugins_dir}/${name}/main.scss`,
      outFile: `${options.output_dir}/plugins/`,
    });
    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.css`, result.css);
      log ? console.log('=> Successfully compiled '.green + name.blue) : undefined;
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }
  });
}

function minifyPlugins(log) {
  log ? console.log('Starting to minify plugins...'.yellow) : undefined;
  plugins.forEach((name) => {
    log ? console.log('Minifying '.yellow + `${name}`.blue) : undefined;
    const result = sass.renderSync({
      file: `${options.plugins_dir}/${name}/main.scss`,
      outFile: `${options.output_dir}/plugins/`,
      outputStyle: 'compressed',
      sourceMap: options.source_map,
    });

    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.min.css`, result.css);
      log ? console.log('=> Successfully minified '.green + name.blue) : undefined;
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }

    if (options.source_map) {
      // Write source map file
      try {
        fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.map`, result.map);
        log ? console.log('=> Successfully generated source map for '.green + name.blue) : undefined;
      } catch (error) {
        console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
        console.log(error);
      }
    }
  });
}

function uglifyJavaScript(log) {
  let code = '';
  let uglified = {};
  try {
    code = fs.readFileSync(options.main_js, 'utf-8');
    uglified = uglifyJS.minify(code, {
      warnings: true,
    });
    if (uglified.warnings) console.log(uglified.warnings);
  } catch (error) {
    console.log('Could not read the input file from the disk. Check if you have read permissions.'.red);
    console.log(error);
  }

  try {
    fs.writeFileSync(options.output_js_min, uglified.code);
    log ? console.log('=> Successfully uglified '.green + 'meshki.js'.blue) : undefined;
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    console.log(error);
  }
}

function copyJavaScript(log) {
  log ? console.log('Copying '.green + 'meshki.js'.blue + ' to dist/js...'.yellow) : undefined;
  try {
    fsExtra.copySync(path.resolve(__dirname, options.main_js), options.output_js);
    log ? console.log('=> Successfully copied '.green + 'meshki.js'.blue + ' to dist/js/'.green) : undefined;
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
    console.log(error);
  }
}

function copyFonts(log) {
  log ? console.log('Copying fonts to dist/fonts...'.yellow) : undefined;
  fs.readdirSync(options.main_fonts).forEach((file) => {
    try {
      fsExtra.copySync(`${__dirname}/${options.main_fonts}${file}`, `${options.output_fonts}${file}`);
      log ? console.log('=> Successfully copied '.green + file.blue + ' to dist/fonts/'.green) : undefined;
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red);
      console.log(error);
    }
  });
}

function copyLicense(log) {
  let copying = '';
  try {
    copying = fs.readFileSync('COPYING', 'utf-8');
    if (process.platform === 'darwin') {
      log ? console.log('✅ Meshki was compiled succesfully! Rock on! 🤘'.cyan) : undefined;
    } else {
      log ? console.log('--Meshki was compiled succesfully! Rock on!'.cyan) : undefined;
    }
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

function compileAll(log = true) {
  createDist(log);
  sassifyMeshki(log);
  minifyMeshki(log);
  sassifyPlugins(log);
  minifyPlugins(log);
  uglifyJavaScript(log);
  copyJavaScript(log);
  copyFonts(log);
  copyLicense(log);
  return true;
}

// If --watch has been passed as an argument
if ((isWatch !== undefined) && (isWatch === '--watch')) {
  console.log('Watching "src" folder...'.magenta);
  watch('src', { recursive: true }, (evt, name) => {
    console.log('%s changed.'.magenta, name);
    compileAll(false) ? console.log('Re-compiled Meshki successfully!'.green) : undefined;
    console.log('Watching "src" folder...'.magenta);
  });
} else {
  compileAll(true);
}
