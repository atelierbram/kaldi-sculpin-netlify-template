module.exports = function(grunt) {

    require('time-grunt')(grunt);

    var devmode = grunt.option('dev');

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: ['build/css','build/js','build/inc'],

      sass: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            'build/css/unprefixed/style-unprefixed.css': 'src/assets/sass/main.scss'
          }
        }
      },

      postcss: {
        options: {
          map: {
          inline: false, // save all sourcemaps as separate files...
          // annotation: 'assets/css/maps/' // ...to the specified directory
          },
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}),
          ]
        },

        dist: {
          expand: true,
          flatten: true,
          files: {
            'build/css/prefixed/style-prefixed.css': 'build/css/unprefixed/style-unprefixed.css',

          }
        }
      },

      // note the difference between `source` and `src`, the latter `src` folder and the `build` folder are not copied over to `dist`
      cssmin: {
        dist: {
          files: {
            'source/assets/css/main.css': 'build/css/prefixed/style-prefixed.css',

          }
        }
      },

      copy: {
        main: {
          files: {
            'build/inc/feature-detect.js.inc': 'build/js/feature-detect.min.js',
          },
          flatten: true,
          filter: 'isFile',
        },
      },


      concat: {
         dist: {
           files: {
             // 'build/js/concat.js':  ['source/assets/js/navigation.js','source/assets/js/skip-link-focus-fix.js'],

           }
         }
       },

      uglify: {
        options: {
          // livereload: true,
          // preserveComments: 'false'
          preserveComments: /^!/
          // only preserve comments that start with a bang
          // https://github.com/gruntjs/grunt-contrib-uglify/issues/366
        },
        dist: {
          files: {
            'build/js/feature-detect.min.js': 'src/assets/js/feature-detect.js',
          }
        }
      },

      watch: {
        options: {
          livereload: true,
        },

        scss: {
            files: ['src/assets/sass/**/*.scss'],
            tasks: ['scss','postcss','cssmin','copy'],
            options: {
              // spawn: false
            }
        },

        js: {
            files: ['src/assets/js/**/*.js'],
            tasks: ['concat','uglify'],
            options: {
              // spawn: false
            }
        },

      },

  });

    grunt.registerTask('build', ['clean','concat', 'uglify', 'sass', 'postcss:dist', 'cssmin', 'copy']);
    grunt.registerTask('clean', ['clean']);
    grunt.registerTask('scss', ['sass', 'postcss:dist', 'cssmin']);
    grunt.registerTask('js', ['uglify', 'concat']);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('dev', ['watch']);

    grunt.loadNpmTasks('grunt-sass','grunt-contrib-cssmin','grunt-contrib-concat','grunt-contrib-uglify','grunt-contrib-watch','matchdep','grunt-postcss','grunt-contrib-copy','grunt-contrib-clean');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default tasks to be run.
};
//    if (devmode) {
//        grunt.task.registerTask('hashres', function(){ console.log('Skipping hashres task because of --dev flag'); });
//        grunt.task.registerTask('uncss', function(){ console.log('Skipping uncss task because of --dev flag'); });
//    }
// };
