/*
* Meshki v1.4.2
* Copyright 2016, Mohammad reza Hajianpour <hajianpour.mr@gmail.com>
* https://borderliner.github.io/Meshki/
* Free to use under the MIT license.
* https://opensource.org/licenses/MIT
*/

module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

    concat_css: {
	    options: {},
	    css: {
        src: [
          'src/css/base/button.css',
          'src/css/base/code.css',
          'src/css/base/footer.css',
          'src/css/base/form.css',
          'src/css/base/grid.css',
          'src/css/base/list.css',
          'src/css/base/meshki.css',
          'src/css/base/navbar.css',
          'src/css/base/normalize.css',
          'src/css/base/sidenav.css',
          'src/css/base/table.css',
          'src/css/base/typography.css',
          'src/css/base/utility.css'
        ],
	    	dest: 'dist/meshki.css'
	    }
	  },

    copy: {
		  js: {
		    expand: false,
		    src: 'src/js/meshki.js',
		    dest: 'dist/meshki.js'
		  },
		  fonts: {
		  	cwd: 'src',
		  	expand: true,
		  	src: 'fonts/*.*',
		  	dest: 'dist/'
		  },
      plugins: {
				cwd: 'src/css',
        expand: true,
        src: 'plugins/*.*',
        dest: 'dist/'
      }
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			minify_rest: {
				src: 'dist/meshki.css',
				dest: 'dist/meshki.min.css'
			},
      minify_rtl: {
        src: 'dist/plugins/rtl.css',
        dest: 'dist/plugins/rtl.min.css'
      },
			minify_button_colors: {
				src: 'dist/plugins/button-colors.css',
        dest: 'dist/plugins/button-colors.min.css'
			}
		},

		uglify: {
	    options: {
	      mangle: true
	    },
	    js: {
        src: 'dist/meshki.js',
        dest: 'dist/meshki.min.js'
      }
	  },

    watch: {
      files: ['src/**/*.*'],
      tasks: ['default']
    }

	});

  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat_css', 'copy', 'cssmin', 'uglify']);
};
