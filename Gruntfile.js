'use strict';
var liveReloadPort = 35729
var lrSnippet = require('connect-livereload')({
  port: liveReloadPort
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
      livereload: {
        options: {
          livereload: liveReloadPort
        },
        files: [
            '_site/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
            '<%= yeoman.app %>/image/**/*.{gif,jpg,jpeg,png,svg,webp}'
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
              mountFolder(connect, '_site')
              ]
          }
        }
      }
    },
    clean: {
      dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%= yeoman.dist %>/*',
                '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      server: ['.tmp', '.jekyll']
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/index.htm'
      }
    },
    cssmin: {
      dist: {
        files: { 'style.min.css': [ '.tmp/css/{,*/}*.css' ] }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: [ 'style.scss' ],
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