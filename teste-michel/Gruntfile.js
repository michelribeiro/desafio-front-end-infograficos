'use strict';

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load tasks JIT-GRUNT USA PARA OTIMIZAR O GRUNT E FAZER COM QUE ELE RODE MAIS RAPIDO.
    require('jit-grunt')(grunt, {
        sprite: 'grunt-spritesmith' //PARA OTIMIZAR O SPRITE PRECISA DESSA CONFIGURAÇÃO
    });

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

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: '<%= config.app %>/*.html'
            },
            css: {
                files: '<%= config.app %>/css/**/*.css'
            },
            js: {
                files: '<%= config.app %>/js/**/*.js'
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
        'connect',
        'watch'
    ]);
};
