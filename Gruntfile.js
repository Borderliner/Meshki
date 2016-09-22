module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
      css: {
        files: ['src/css/*.css'],
        tasks: ['cssmin', 'copy', 'concat_css']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify', 'copy']
      }
    },
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},

			minify: {
				src: 'src/css/*.css',
				dest: 'dist/meshki.min.css'
			}
		},
		uglify: {
	    options: {
	      mangle: false
	    },
	    my_target: {
	      files: {
	        'dist/meshki.min.js': ['src/js/meshki.js']
	      }
	    }
	  },
	  copy: {
		  main: {
		    expand: false,
		    src: 'src/js/meshki.js',
		    dest: 'dist/meshki.js',
		  },
		  fonts: {
		  	cwd: 'src',
		  	expand: true,
		  	src: 'fonts/*.ttf',
		  	dest: 'dist/'
		  }
		},
		concat_css: {
	    options: {},
	    all: {
	    	src: ['src/css/*.css'],
	    	dest: 'dist/meshki.css'
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['cssmin', 'uglify', 'copy', 'concat_css']);
};