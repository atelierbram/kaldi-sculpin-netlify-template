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
            'build/css/unprefixed/style-unprefixed.css': 'src/assets/sass/main.scss',
            'build/css/unprefixed/backlink-unprefixed.css': 'src/assets/sass/backlink.scss'
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
            'build/css/prefixed/backlink-prefixed.css': 'build/css/unprefixed/backlink-unprefixed.css',

          }
        }
      },

      // note the difference between `source` and `src`, the latter `src` folder and the `build` folder are not copied over to `dist`
      cssmin: {
        dist: {
          files: {
            'source/assets/css/main.css': 'build/css/prefixed/style-prefixed.css',
            'source/assets/css/backlink.css': 'build/css/prefixed/backlink-prefixed.css',

          }
        }
      },

      copy: {
        main: {
          files: {
            'source/_includes/detect-webfont.js.inc': 'build/js/detect-webfont.min.js',
            'source/_includes/responsive-nav.js.inc': 'build/js/responsive-nav.min.js',
            'source/_includes/backlink.js.inc': 'build/js/backlink.min.js',
            'source/_includes/backlink.css.inc': 'source/assets/css/backlink.css'
          },
          flatten: true,
          filter: 'isFile',
        },
      },


      concat: {
         dist: {
           files: {
             'build/js/detect-webfont.js':  ['src/assets/js/feature-detect.js','src/assets/js/webfontloader.js'],
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
            'build/js/detect-webfont.min.js': 'build/js/detect-webfont.js',
            'build/js/responsive-nav.min.js': 'src/assets/js/responsive-nav.js',
            'build/js/backlink.min.js': 'src/assets/js/backlink.js',
          }
        }
      },

      svgstore: {
        options: {
          svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
            viewBox : '0 0 32 32',
            xmlns: 'http://www.w3.org/2000/svg'
          }
        },
        default: {
          files: {
            'source/_includes/svgstore.twig': ['src/assets/img/icons/*.svg'],
          },
        },
      },

      watch: {
        options: {
          // using the LiveReload browser-extension here, see https://github.com/gruntjs/grunt-contrib-watch#live-reloading
          livereload: 35729,
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
            tasks: ['concat','uglify', 'copy'],
            options: {
              // spawn: false
            }
        },

      },

      exec: {
        remove_ds_store1: {
          command: 'rm -f *.DS_Store',
          stdout: false,
          stderr: false
        },
        remove_ds_store2: {
          command: 'rm -f source/.DS_Store',
          stdout: false,
          stderr: false
        },
        remove_ds_store3: {
          command: 'rm -f source/_posts/.DS_Store',
          stdout: false,
          stderr: false
        },
        remove_ds_store4: {
          command: 'rm -f source/_includes/.DS_Store',
          stdout: false,
          stderr: false
        },
        remove_ds_store5: {
          command: 'rm -f source/_views/.DS_Store',
          stdout: false,
          stderr: false
        }

      },

    });

  grunt.registerTask('build', ['clean','concat','uglify','sass','postcss:dist','cssmin','copy','svgstore']);
  grunt.registerTask('clean', ['clean']);
  grunt.registerTask('scss', ['sass', 'postcss:dist', 'cssmin']);
  grunt.registerTask('js', ['uglify', 'concat']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('dev', ['watch']);

  grunt.loadNpmTasks('grunt-sass','grunt-contrib-cssmin','grunt-contrib-concat','grunt-contrib-uglify','grunt-contrib-watch','matchdep','grunt-postcss','grunt-contrib-copy','grunt-contrib-clean','grunt-svgstore','grunt-exec');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default tasks to be run.
};
//    if (devmode) {
//        grunt.task.registerTask('hashres', function(){ console.log('Skipping hashres task because of --dev flag'); });
//        grunt.task.registerTask('uncss', function(){ console.log('Skipping uncss task because of --dev flag'); });
//    }
// };
