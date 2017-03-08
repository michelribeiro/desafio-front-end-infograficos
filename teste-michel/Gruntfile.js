'use strict';

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load tasks JIT-GRUNT USA PARA OTIMIZAR O GRUNT E FAZER COM QUE ELE RODE MAIS RAPIDO.
    require('jit-grunt')(grunt, {
        sprite: 'grunt-spritesmith' //PARA OTIMIZAR O SPRITE PRECISA DESSA CONFIGURAÇÃO
    });

    var mozjpeg = require('imagemin-mozjpeg');

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp'
    };

    grunt.initConfig({

        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                      '.sass-cache/*',
                      '<%= config.dist %>/*',
                      '<%= config.tmp %>/*'
                    ]
                }]
            }
        },

        // Delete Empties folders
        cleanempty: {
            options: {},
            src: ['.tmp/', 'dist/']
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: false,
                    sourceMapIncludeSources: false,
                    beautify: true,
                    mangle: false
                },
                src: [
                    '<%= config.app %>/js/main-modules.js',
                    '<%= config.app %>/js/moduleInitializer.js',
                    '<%= config.app %>/js/modules/**/*.js',
                    '<%= config.app %>/js/app.js',
                    '<%= config.app %>/js/controllers.js',
                    '<%= config.app %>/js/services.js',
                ],
                    dest: '<%= config.app %>/js/main.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: '<%= config.app %>/**/*.html'
            },
            js: {
                files: ['<%= config.app %>/js/**/*.js']
            },
            sass: {
                files: ['<%= config.app %>/css/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            images: {
                files: ['<%= config.app %>/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['imagemin:dev'],
            }
        },

        // Compress the CSS.
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/',
                    src: ['**/*.scss'],
                    dest: '<%= config.app %>/css/',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded' //expanded or compressed
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/',
                    src: ['**/*.scss'],
                    dest: '<%= config.app %>/css/',
                    ext: '.css'
                }]
            }
        },

        // Auto prefix css
        autoprefixer: {
            dev: {
                options: {
                    map: true,
                    browsers: ['last 2 versions', 'ie 9', '> 1%']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= config.tmp %>/css/'
                }]
            }
        },

        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.{png,jpg,gif}', '!sprite/**'],
                    dest: '<%= config.app %>/images/'
                }]
            },
            static: {
                options: { // Target options
                    optimizationLevel: 1,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg({quality: 100})]
                }
            }
        },

        // Connect
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: './<%= config.app %>/',
                    hostname: '*',
                    livereload: true,
                    open: true
                }
            }
        }

    });
    //final do grunt init

    // Task Development
    grunt.registerTask('default', [
        'clean',
        'cleanempty',
        'sass:dev',
        'uglify:dev',
        'imagemin:dev',
        'connect',
        'watch',
        'autoprefixer:dev'
    ]);
};
