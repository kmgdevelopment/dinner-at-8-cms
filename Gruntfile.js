module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: false,
                    cacheLocation: 'src/assets/sass/.sass-cache',
                    loadPath: ['node_modules'] // add to the list of paths to prepend to SASS @import functions
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/sass/',
                    src: ['**/*.scss'],
                    dest: 'dist/assets/css/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true // use the livereload browser extension
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true // re-initialize grunt to apply changes
                }
            },
            sass: {
                files: ['src/assets/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: true // forces watch to bail out completely on an error
                }
            },
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['compile-js'],
                options: {
                    livereload: true
                }
            }
        },
        concat: {
            main: {
                src: [
                    'node_modules/svg4everybody/dist/svg4everybody.js',
                    'node_modules/outdatedbrowser/outdatedbrowser/outdatedbrowser.js',
                    'node_modules/jquery-validation/dist/jquery.validate.js',
                    'node_modules/dropkickjs/dist/dropkick.js',
                    'node_modules/prismjs/prism.js',
                    'node_modules/nosleep.js/dist/NoSleep.js',
                    'src/assets/js/plugins/jquery.restable.js',
                    'src/assets/js/methods/helpers.js',
                    'src/assets/js/methods/ux.js',
                    'src/assets/js/controllers/ui.js',
                    'src/assets/js/controllers/ux.js',
                    'src/assets/js/controllers/structures.js',
                    'src/assets/js/controllers/forms.js'
                ],
                dest: 'src/assets/js/main.js'
            },
            jquery: {
                src: 'node_modules/jquery/dist/jquery.min.js',
                dest: 'dist/assets/js/vendor/jquery.min.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                src: 'src/assets/js/main.js',
                dest: 'dist/assets/js/main.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass'); // SASS - http://goo.gl/pCHySn
    grunt.loadNpmTasks('grunt-contrib-watch'); // Watch - http://goo.gl/yxNE0
    grunt.loadNpmTasks('grunt-contrib-concat'); // Concat - https://goo.gl/CBOh9
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Uglify - https://goo.gl/1gnPpD
    grunt.registerTask('compile-js', ['concat:main', 'uglify:dist']);
};