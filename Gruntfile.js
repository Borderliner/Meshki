module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		    expand: true,
		    src: 'src/js/meshki.js',
		    dest: 'dist/',
		  },
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['cssmin', 'uglify', 'copy']);
};