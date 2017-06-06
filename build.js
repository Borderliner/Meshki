const fs     = require('fs')
const colors = require('colors')
const sass   = require('node-sass')

const options = {
  main_scss:  'src/scss/main.scss',
  output_css: 'dist/css/meshki.css',
  plugins:    ['extra-button-colors', 'rtl'],
}

function remove_dir(path) {
  if (fs.existsSync(path)) {
     fs.readdirSync(path).forEach((file, index) => {
       var current_path = `${path}/${file}`
       if (fs.lstatSync(current_path).isDirectory()) {
         remove_dir(current_path);
       } else {
         fs.unlinkSync(current_path)
       }
     })
     fs.rmdirSync(path)
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
  sass.render({
    file:    options.main_scss,
    outFile: options.output_css,
  }, (error, result) => {
    if (!error) {
      fs.writeFile(options.output_css, result.css, (error) => {
        if (!error) {
          console.log('=> Successfully compiled Meshki'.green)
        } else {
          console.log('Could not write the output to the disk. Check if you have write permissions.'.red)
        }
      })
    } else {
      console.log('Could not find the main Scss file.'.red)
    }
  })
}

create_dist()
sassify_meshki()
