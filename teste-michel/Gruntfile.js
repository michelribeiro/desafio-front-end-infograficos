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
                    '<%= config.app %>/js/app.js',
                    '<%= config.app %>/js/services.js',
                    '<%= config.app %>/js/controllers.js',
                    '<%= config.app %>/js/modules/listSlide.js',
                    '<%= config.app %>/js/modules/slide.js',
                    '<%= config.app %>/js/api-graphic.js'
                ],
                    dest: '<%= config.tmp %>/js/main.js'
            },
            dist: {
                options: {
                  report: 'gzip',
                  beautify: true,
                  mangle: false
                },
                files: {
                    '<%= config.dist %>/js/main.js':
                    [
                        '<%= config.app %>/js/app.js',
                    '<%= config.app %>/js/services.js',
                    '<%= config.app %>/js/controllers.js',
                    '<%= config.app %>/js/modules/listSlide.js',
                    '<%= config.app %>/js/modules/slide.js',
                    '<%= config.app %>/js/api-graphic.js'
                    ]
                }
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
                files: ['<%= config.app %>/js/**/*.js'],
                tasks: ['uglify:dev']
            },
            sass: {
                files: ['<%= config.app %>/css/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            images: {
                files: ['<%= config.app %>/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['imagemin:tmp']
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
                    dest: '<%= config.dist %>/css/',
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
            },
            dist: {
                options: {
                    map: false,
                    browsers: ['last 2 versions', 'ie 9', '> 1%']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css',
                    src: '{,*/}*.css',
                    dest: '<%= config.dist %>/css'
                }]
            }
        },

        // Compress img.
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.tmp %>/images/'
                }]
            },
            static: {
                options: {
                    optimizationLevel: 1,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg({quality: 100})]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/images/'
                }]
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/index.html',
                        dest: '<%= config.tmp %>/index.html'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/views/listnews.html',
                        dest: '<%= config.tmp %>/views/listnews.html'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/data/**/*.json',
                        dest: '<%= config.tmp %>/data/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/js/vendor/**/*.js',
                        dest: '<%= config.tmp %>/js/vendor/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/index.html',
                        dest: '<%= config.dist %>/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/views/**/*',
                        dest: '<%= config.dist %>/views/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/data/**/*.json',
                        dest: '<%= config.dist %>/data/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= config.app %>/js/vendor/**/*.js',
                        dest: '<%= config.dist %>/js/vendor/'
                    }
                ]
            },
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
        'copy:dev',
        'sass:dev',
        'uglify:dev',
        'imagemin:dev',
        'connect',
        'watch',
        'autoprefixer:dev'
    ]);

    // Task Build
    grunt.registerTask('build', [
        'clean',
        'sass:dist',
        'autoprefixer:dist',
        'copy:dist',
        'imagemin:static',
        'uglify:dist'
    ]);
};
