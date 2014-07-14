/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '0.1.1'
    },

    concat: {
      options: {

    banner: '\n/*! <%= pkg.name %>.jsx - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: false
      },
      scripts: {

        src: [
        'src/objio/lic-info.jsx',
        'src/objio/versionhistory.jsx',
        'src/objio/globals.jsx',
        'src/objio/versioncheck.jsx',
        'src/objio/util.jsx',
        'src/objio/OBJLoader.jsx',
        'src/objio/importer.jsx',
        'src/objio/exporter.jsx',
        'src/objio/ui.jsx',
        'src/objio/main.jsx'
        ],
        dest: 'src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx'
      }
    },

    copy: {
      "script": {
        src: "src/tmp/<%= pkg.name %>.concat.wrap.<%= pkg.version %>.jsx",
        dest: "dist/<%= pkg.name %>.<%= pkg.version %>.jsx",
      },
    },
     /**
     * wrap it
     */
    wrap: {
      'script': {
        src: ['src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx'],
        dest: 'src/tmp/<%= pkg.name %>.concat.wrap.<%= pkg.version %>.jsx',
        options: {
          wrapper: ['(function(thisObj) {', '})(this);\n']
        },
      },
    },
    watch: {
      files: ['src/objio/*.jsx', 'src/objio/*.js', 'src/lib/*'],
      tasks: ['concat:scripts', 'wrap:script','copy:script']
    }

  });
grunt.registerTask('build', ['concat:scripts', 'wrap:script','copy:script']);
  grunt.registerTask('default', ['watch']);

};
