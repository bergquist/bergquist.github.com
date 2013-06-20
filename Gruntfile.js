'use strict';
var liveReloadPort = 35729;
var lrSnippet = require('connect-livereload')({
    port: liveReloadPort
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var yeomanConfig = {
    app: 'app',
    dist: 'dist'
};

module.exports = function(grunt) {
    grunt.initConfig({
        yeoman: yeomanConfig,

        watch: {
            livereload: {
                options: {
                    livereload: liveReloadPort
                },
                files: [
                        '.jekyll/**/*.html',
                        '.tmp/css/**/*.css',
                        '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
                        '<%= yeoman.app %>/image/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        compass: {
            options: {
                sassDir: 'css',
                cssDir: '.tmp/styles'//,
                /*
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
                */
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                    'Gruntfile.js'
            ],
            report: [
                    'Gruntfile.js',
                    '!<%= yeoman.app %>/js/vendor/**/*'
            ]
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            report: {
                src: ['{.tmp,<%= yeoman.app %>}/css/**/*.css']
            }
        },
        cssmin: {
            dist: {
                files: {
                    'style.min.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        usemin: {
            options: {
                basedir: '<%= yeoman.dist %>',
                dirs: ['<%= yeoman.dist %>/**/*']
            },
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/css/**/*.css']
        },
        rev: {
            options: {
                length: 4
            },
            dist: {
                files: {
                    src: [
                            '<%= yeoman.dist %>/js/**/*.js',
                            '<%= yeoman.dist %>/css/**/*.css',
                            '<%= yeoman.dist %>/image/**/*.{gif,jpg,jpeg,png,svg,webp}',
                            '<%= yeoman.dist %>/fonts/**/*.{eot*,svg,ttf,woff}'
                    ]
                }
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'jshint:all',
        'csslint',
        'compass',
        'cssmin'
    ]);
};