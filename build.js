const fs        = require('fs')
const path      = require('path')
const colors    = require('colors')
const sass      = require('node-sass')
const cleanCSS  = require('clean-css')

const options = {
  main_scss:      'src/scss/main.scss',
  output_dir:     'dist/',
  output_css:     'dist/css/meshki.css',
  output_css_min: 'dist/css/meshki.min.css',
  plugins_dir:    'src/scss/plugins/',
  source_map:     false,
}

const plugins = list_dir(options.plugins_dir)

function list_dir(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

function remove_dir(srcpath) {
  if (fs.existsSync(srcpath)) {
     fs.readdirSync(srcpath).forEach((file, index) => {
       var current_path = `${srcpath}/${file}`
       if (fs.lstatSync(current_path).isDirectory()) {
         remove_dir(current_path);
       } else {
         fs.unlinkSync(current_path)
       }
     })
     fs.rmdirSync(srcpath)
   }
}

function create_dist() {
  if(!fs.existsSync('dist/')) {
    console.log('No "dist" folder exists. Creating folders...'.yellow)
    fs.mkdirSync('dist/')
    fs.mkdirSync('dist/plugins/')
    fs.mkdirSync('dist/fonts/')
    fs.mkdirSync('dist/css/')
    fs.mkdirSync('dist/js/')
    console.log('=> "dist" folder was created successfully!'.green)
  } else {
    console.log('Cleaning previously compiled files...'.yellow)
    remove_dir('dist/')
    create_dist()
  }
}

function sassify_meshki() {
  console.log('Compiling Meshki...'.yellow)
  let result = sass.renderSync({
    file:        options.main_scss,
    outFile:     options.output_css,
  })
  // Write CSS file
  try {
    fs.writeFile(options.output_css, result.css)
    console.log('=> Successfully compiled Meshki'.green)
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
  }
}

function minify_meshki() {
  console.log('Minifying Meshki...'.yellow)
  let result = sass.renderSync({
    file:        options.main_scss,
    outputStyle: 'compressed',
    outFile:     options.output_css_min,
    sourceMap:   options.source_map,
  })
  // Write Minified CSS file
  try {
    fs.writeFile(options.output_css_min, result.css)
    console.log('=> Successfully minified Meshki'.green)
  } catch (error) {
    console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
  }

  if (options.source_map) {
    // Write SourceMaps
    try {
      fs.writeFile(`${options.output_css}.map`, result.map)
      console.log('=> Successfully generated source maps for Meshki'.green)
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
    }
  }
}

function sassify_plugins() {
  console.log('Starting to compile plugins...'.blue)
  plugins.forEach((name, index) => {
    console.log(`Compiling `.yellow + `${name}`.blue)
    let result = sass.renderSync({
      file:        options.plugins_dir + name + '/main.scss',
      outFile:     options.output_dir + 'plugins/',
    })
    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/${name}.css`, result.css)
      console.log(`=> Successfully compiled ${name}`.green)
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
      console.log(error)
    }
  })
}

function minify_plugins() {
  console.log('Starting to minify plugins...'.blue)
  plugins.forEach((name, index) => {
    console.log(`Minifying `.yellow + `${name}`.blue)
    let result = sass.renderSync({
      file:        options.plugins_dir + name + '/main.scss',
      outFile:     options.output_dir + 'plugins/',
      outputStyle: 'compressed',
      sourceMap:   options.source_map,
    })

    // Write CSS file
    try {
      fs.writeFileSync(`${options.output_dir}plugins/${name}.min.css`, result.css)
      console.log(`=> Successfully minified ${name}`.green)
    } catch (error) {
      console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
      console.log(error)
    }

    if (options.source_map) {
      // Write source map file
      try {
        fs.writeFileSync(`${options.output_dir}plugins/${name}.map`, result.map)
        console.log(`=> Successfully generated source map for ${name}`.green)
      } catch (error) {
        console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
        console.log(error)
      }
    }
  })
}

create_dist()
sassify_meshki()
minify_meshki()
sassify_plugins()
minify_plugins()
