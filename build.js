/*
 * Meshki v3.4.0 (https://borderliner.github.io/Meshki/)
 * Copyright 2016-2024 Mohammadreza Hajianpour <hajianpour.mr@gmail.com>
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

import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import * as sass from 'sass'
import uglifyJs from 'uglify-js'
import watch from 'node-watch'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isWatch = process.argv[2]

const options = {
  main_scss: 'src/scss/main.scss',
  main_js: 'src/js/meshki.js',
  output_dir: 'dist/',
  output_css: 'dist/css/meshki.css',
  output_css_min: 'dist/css/meshki.min.css',
  output_js: 'dist/js/meshki.js',
  output_js_min: 'dist/js/meshki.min.js',
  plugins_dir: 'src/scss/plugins',
  source_map: true,
  licensed: [
    'dist/js/meshki.min.js',
    'dist/css/meshki.min.css',
    'dist/plugins/meshki-extra-button-colors.min.css',
    'dist/plugins/meshki-rtl.min.css',
    'dist/plugins/meshki-light-mode.min.css'
  ]
}

function listDirectory (srcpath) {
  return fs.readdirSync(srcpath)
    .filter((file) => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

function removeDirectory (srcpath) {
  fs.rmSync(srcpath, { recursive: true, force: true })
}

function createDist (log) {
  if (!fs.existsSync('dist/')) {
    log ? console.log(chalk.yellow('No ') + chalk.blue.bold('"dist"') + chalk.yellow(' folder exists. Creating folders...')) : undefined
    fs.mkdirSync('dist/')
    fs.mkdirSync('dist/plugins/')
    fs.mkdirSync('dist/css/')
    fs.mkdirSync('dist/js/')
    log ? console.log(chalk.green('=> ') + chalk.blue('"dist"') + chalk.green(' folder was created successfully!')) : undefined
  } else {
    log ? console.log(chalk.magenta('Cleaning previously compiled files...')) : undefined
    removeDirectory('dist/')
    createDist(log)
  }
}

const plugins = listDirectory(options.plugins_dir)

// Append a sourceMappingURL comment so browsers can locate the (sibling) map file.
// The modern Dart Sass API does not emit this comment automatically.
function withSourceMappingURL (css, mapPath) {
  return `${css}\n/*# sourceMappingURL=${path.basename(mapPath)} */\n`
}

function sassifyMeshki (log) {
  log ? console.log(chalk.yellow('Compiling ') + chalk.blue.bold('meshki.scss') + chalk.yellow('...')) : undefined
  const result = sass.compile(options.main_scss)
  // Write CSS file
  try {
    fs.writeFileSync(options.output_css, result.css)
    log ? console.log(chalk.green('=> Successfully compiled ') + chalk.blue.bold('meshki.scss')) : undefined
  } catch (error) {
    console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
    console.log(error)
  }
}

function minifyMeshki (log) {
  log ? console.log(chalk.yellow('Minifying ') + chalk.blue.bold('meshki.css') + chalk.yellow('...')) : undefined
  const result = sass.compile(options.main_scss, {
    style: 'compressed',
    sourceMap: options.source_map,
    sourceMapIncludeSources: true
  })
  const mapPath = `${options.output_css_min}.map`
  const css = (options.source_map && result.sourceMap)
    ? withSourceMappingURL(result.css, mapPath)
    : result.css
  // Write Minified CSS file
  try {
    fs.writeFileSync(options.output_css_min, css)
    log ? console.log(chalk.green('=> Successfully minified ') + chalk.blue.bold('meshki.css')) : undefined
  } catch (error) {
    console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
    console.log(error)
  }

  if (options.source_map && result.sourceMap) {
    // Write SourceMap next to the file that references it
    try {
      fs.writeFileSync(mapPath, JSON.stringify(result.sourceMap))
      log ? console.log(chalk.green('=> Successfully generated source maps for ') + chalk.blue.bold('meshki.min.css')) : undefined
    } catch (error) {
      console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
      console.log(error)
    }
  }
}

function sassifyPlugins (log) {
  log ? console.log(chalk.magenta('Starting to compile plugins...')) : undefined
  plugins.forEach((name) => {
    log ? console.log(chalk.yellow('Compiling ') + chalk.blue.bold(`${name}`)) : undefined
    const result = sass.compile(`${options.plugins_dir}/${name}/main.scss`)
    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/meshki-${name}.css`, result.css)
      log ? console.log(chalk.green('=> Successfully compiled ') + chalk.blue.bold(name)) : undefined
    } catch (error) {
      console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
      console.log(error)
    }
  })
}

function minifyPlugins (log) {
  log ? console.log(chalk.magenta('Starting to minify plugins...')) : undefined
  plugins.forEach((name) => {
    log ? console.log(chalk.yellow('Minifying ') + chalk.blue.bold(`${name}`)) : undefined
    const result = sass.compile(`${options.plugins_dir}/${name}/main.scss`, {
      style: 'compressed',
      sourceMap: options.source_map,
      sourceMapIncludeSources: true
    })
    const outFile = `${options.output_dir}plugins/meshki-${name}.min.css`
    const mapPath = `${outFile}.map`
    const css = (options.source_map && result.sourceMap)
      ? withSourceMappingURL(result.css, mapPath)
      : result.css

    // Write CSS file
    try {
      fs.writeFileSync(outFile, css)
      log ? console.log(chalk.green('=> Successfully minified ') + chalk.blue.bold(name)) : undefined
    } catch (error) {
      console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
      console.log(error)
    }

    if (options.source_map && result.sourceMap) {
      // Write source map file next to the file that references it
      try {
        fs.writeFileSync(mapPath, JSON.stringify(result.sourceMap))
        log ? console.log(chalk.green('=> Successfully generated source map for ') + chalk.blue.bold(name)) : undefined
      } catch (error) {
        console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
        console.log(error)
      }
    }
  })
}

function uglifyJavaScript (log) {
  let code = ''
  try {
    code = fs.readFileSync(options.main_js, 'utf-8')
  } catch (error) {
    console.log(chalk.red('Could not read the input file from the disk. Check if you have read permissions.'))
    console.log(error)
    return
  }

  // uglifyJs.minify() does not throw; it reports failures on the `error` field.
  const uglified = uglifyJs.minify(code, { warnings: true })
  if (uglified.error) {
    console.log(chalk.red('Could not uglify meshki.js:'))
    console.log(uglified.error)
    return
  }
  if (uglified.warnings) console.log(uglified.warnings)

  try {
    fs.writeFileSync(options.output_js_min, uglified.code)
    log ? console.log(chalk.green('=> Successfully uglified ') + chalk.blue.bold('meshki.js')) : undefined
  } catch (error) {
    console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
    console.log(error)
  }
}

function copyJavaScript (log) {
  log ? console.log(chalk.yellow('Copying ') + chalk.blue.bold('meshki.js') + chalk.yellow(' to dist/js')) : undefined
  try {
    fsExtra.copySync(path.resolve(__dirname, options.main_js), options.output_js)
    log ? console.log(chalk.green('=> Successfully copied ') + chalk.blue.bold('meshki.js') + chalk.green(' to dist/js')) : undefined
  } catch (error) {
    console.log(chalk.red('Could not write the output to the disk. Check if you have write permissions.'))
    console.log(error)
  }
}

function copyLicense (log) {
  let copying = ''
  try {
    copying = fs.readFileSync('COPYING', 'utf-8')
  } catch (error) {
    console.log(error)
    return
  }

  options.licensed.forEach((file) => {
    try {
      const fileContent = fs.readFileSync(file, 'utf-8')
      fs.writeFileSync(file, `${copying}\n${fileContent}`)
    } catch (error) {
      console.log(error)
    }
  })

  if (process.platform === 'darwin' || process.platform === 'linux') {
    log ? console.log(chalk.cyan.bold('✅ Meshki was compiled succesfully! Rock on! 🤘')) : undefined
  } else {
    log ? console.log(chalk.cyan.bold('--Meshki was compiled succesfully! Rock on!')) : undefined
  }
}

function compileAll (log = true) {
  createDist(log)
  sassifyMeshki(log)
  minifyMeshki(log)
  sassifyPlugins(log)
  minifyPlugins(log)
  uglifyJavaScript(log)
  log ? console.log(chalk.magenta('Copying assets...')) : undefined
  copyJavaScript(log)
  copyLicense(log)
  return true
}

// If --watch has been passed as an argument
if (isWatch === '--watch') {
  console.log(chalk.greenBright.italic('Compiling project...'))
  compileAll()
  console.log(chalk.magenta.italic('Watching "src" folder...'))
  watch('src', { recursive: true }, (evt, name) => {
    console.log('File ' + chalk.magenta('%s') + ' changed.', name)
    compileAll(false) ? console.log(chalk.green('Re-compiled Meshki successfully!')) : undefined
    console.log(chalk.magenta.italic('Watching "src" folder...'))
  })
} else {
  compileAll(true)
}
