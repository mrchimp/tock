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
    simplemocha: {
      options: {
        reporter: 'dot'
      },
      all: {
        src: ['test/**/*.js']
      }
    },
    focus: {
      all: {}
    },
    watch: {
      compile: {
        files: filenames,
        tasks: [
          'default'
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
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-focus');

  grunt.registerTask('default', [
  	'uglify',
    'jshint',
    'simplemocha'
	]);

	grunt.registerTask('watch-all', [
		'focus:all'
	]);
};
