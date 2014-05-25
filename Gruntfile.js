module.exports = function(grunt) {

	var filenames = ['tock.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        compress: false
      },
      dist: {
        files: {
          'tock.min.js': filenames
        }
      }
    },
    jshint: {
      with_defaults: filenames
    },
    focus: {
      all: {}
    },
    watch: {
      compile: {
        files: filenames,
        tasks: [
          'jshint',
          'uglify'
        ],
        options: {
          nospawn: true
        }
      },
  	}
	});


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-focus');

  grunt.registerTask('default', [
  	'jshint',
  	'uglify'
	]);

	grunt.registerTask('watch-all', [
		'focus:all'
	]);
};
