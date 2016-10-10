task default: %w[before_clean concat_css uglify_css uglify_js after_clean]

task :before_clean do
  puts colorize 36, "Cleaning old output files..."

  begin
    puts 'rm -f dist/meshki2.css dist/meshki2.min.css'
    system 'rm -f dist/meshki2.css dist/meshki2.min.css'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :concat_css do
  puts colorize 36, "Concatenating CSS files..."

  begin
    puts 'cat src/css/*.css >> dist/meshki2.css'
    system 'cat src/css/*.css >> dist/meshki2.css'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :uglify_css do
  puts colorize 36, "Uglifying CSS files..."

  begin
    puts 'sass --scss dist/meshki2.css:dist/meshki2.min.css --style compressed'
    system 'sass --scss dist/meshki2.css:dist/meshki2.min.css --style compressed'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'FAILED'
  end

end

task :uglify_js do
  puts colorize 36, "Uglifying JS files..."

  begin
    puts 'cp src/js/meshki.js dist/'
    system 'cp src/js/meshki.js dist/meshki2.js'
    puts 'uglifyjs --compress --mangle -o dist/meshki2.min.js dist/meshki2.js'
    system 'uglifyjs --compress --mangle -o dist/meshki2.min.js dist/meshki2.js'
    puts colorize 32, 'DONE'
  rescue Exception => msg
    puts msg
    puts colorize 31, 'Make sure you have `uglifyjs` installed via npm, and could be found in your $PATH!'
    puts colorize 31, 'FAILED'
  end

end

task :after_clean do
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
