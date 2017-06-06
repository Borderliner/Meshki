const fs     = require('fs')
const colors = require('colors')

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
  } else {
    console.log('Cleaning previously compiled files...'.yellow)
    remove_dir('dist/')
    create_dist()
  }
}
