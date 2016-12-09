# Meshki v1.4.1
# Copyright 2016, Mohammad reza Hajianpour <hajianpour.mr@gmail.com>
# https://borderliner.github.io/Meshki/
# Free to use under the MIT license.
# https://opensource.org/licenses/MIT

task default: %w[before concat_css uglify_css uglify_js copy_fonts after]

task :before do
  puts colorize 36, "Cleaning old output files..."

  begin
    puts 'rm -rf dist'
    system 'rm -rf dist'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

  puts colorize 36, "Creating `dist` folder..."
  begin
    puts 'mkdir -p dist/fonts/'
    system 'mkdir -p dist/fonts/'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :concat_css do
  puts colorize 36, "Concatenating CSS files..."

  begin
    puts "mv src/css/rtl.css src/css/rtl"
    system "mv src/css/rtl.css src/css/rtl"
    puts "cat src/css/*.css >> dist/meshki.css"
    system "cat src/css/*.css >> dist/meshki.css"
    puts "mv src/css/rtl src/css/rtl.css"
    system "mv src/css/rtl src/css/rtl.css"
    puts "cp src/css/rtl.css dist/"
    system "cp src/css/rtl.css dist/meshki-rtl.css"
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :uglify_css do
  puts colorize 36, "Uglifying CSS files..."

  begin
    puts 'sass --scss dist/meshki.css:dist/meshki.min.css --style compressed'
    system 'sass --scss dist/meshki.css:dist/meshki.min.css --style compressed'
    puts 'sass --scss dist/meshki-rtl.css:dist/meshki-rtl.min.css --style compressed'
    system 'sass --scss dist/meshki-rtl.css:dist/meshki-rtl.min.css --style compressed'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :uglify_js do
  puts colorize 36, "Uglifying JS files..."

  begin
    puts 'cp src/js/* dist/'
    system 'cp src/js/* dist/'
    puts 'uglifyjs --compress --mangle -o dist/meshki.min.js dist/meshki.js'
    system 'uglifyjs --compress --mangle -o dist/meshki.min.js dist/meshki.js'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'Make sure you have `uglifyjs` installed via npm, and could be found in your $PATH!'
    puts colorize 31, 'FAILED'
  end

end

task :copy_fonts do
  puts colorize 36, "Copying fonts into dist folder..."

  begin
    puts 'cp -f src/fonts/* dist/fonts/'
    system 'cp -f src/fonts/* dist/fonts/'
    puts 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :after do
  puts colorize 36, "Cleaning cached files..."

  begin
    puts 'rm -rf .sass-cache'
    system 'rm -rf .sass-cache'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

def colorize(color, text)
  "\e[#{color}m#{text}\e[0m"
end
