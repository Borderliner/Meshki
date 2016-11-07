/*
* Meshki v1.4.0
* Copyright 2016, Mohammad reza Hajianpour <hajianpour.mr@gmail.com>
* http://meshki.borderliner.ir/
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
          'src/css/button.css',
          'src/css/code.css',
          'src/css/footer.css',
          'src/css/form.css',
          'src/css/grid.css',
          'src/css/list.css',
          'src/css/meshki.css',
          'src/css/navbar.css',
          'src/css/normalize.css',
          'src/css/sidenav.css',
          'src/css/table.css',
          'src/css/typography.css',
          'src/css/utility.css'
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
		  	src: 'fonts/*.ttf',
		  	dest: 'dist/'
		  },
      css_rtl: {
        expand: false,
        src: 'src/css/rtl.css',
        dest: 'dist/meshki-rtl.css'
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
        src: 'dist/meshki-rtl.css',
        dest: 'dist/meshki-rtl.min.css'
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
