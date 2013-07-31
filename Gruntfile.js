'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
})
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir))
}
var yeomanConfig = {
  app: 'app',
  dist: 'dist'
}

module.exports = function(grunt) {
  grunt.initConfig({
    yeoman: yeomanConfig,

    watch: {
      options: {
        nospawn: true
      },
      sass: {
        files: [ '/**/*.scss' ],
        tasks: [ 'sass' ]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
            '_site/**/*.html',
            '.tmp/css/**/*.css'
        ]
      }
    },
    connect: {
      options: {
        port: 9000
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '_site')
            ]
          }
        }
      }
    },
    clean: {
      dist: {
        files: [ { dot: true, src: [ '.tmp' ] } ]
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/index.htm'
      }
    },
    cssmin: {
      dist: {
        files: { 'static/style.min.css': [ '.tmp/css/{,*/}*.css' ] }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          src: [ 'scss/style.scss' ],
          dest: '.tmp/css',
          ext: '.css'
        }]
      }
    }
  })

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', [ 'clean', 'sass', 'cssmin' ])
  grunt.registerTask('dev', [
    'connect:livereload',
    'open',
    'watch'
  ])

  grunt.registerTask('build', [])
  grunt.registerTask('deploy', [])
}