task default: %w[clean_output concat_css uglify_css]

task :clean_output do
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

def colorize(color, text)
  "\e[#{color}m#{text}\e[0m"
end
