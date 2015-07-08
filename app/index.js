'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      '\'Allo \'allo! Let\'s build a ' + chalk.red('static site') + '! Out of the box I include Sass and a gulpfile.js to build the static files nice and tidy.'
    ));

    var prompts = [{
      type: 'string',
      name: 'project',
      message: 'What\'s your project\'s name?' + chalk.red(' (Required)'),
      validate: function (input) {
        if (input === '') {
          return 'Please enter your project\'s name';
        }
        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.project = props.project;
      // To access props later use this.props.someOption;
      // var features = props.features;

      // // manually deal with the response, get back and store the results.
      // // we change a bit this way of doing to automatically do this in the self.prompt() method.

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var projectName = this.project;

      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('dist/bower.json')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('src/js/app.js')
      );
      this.fs.copy(
        this.templatePath('styles.scss'),
        this.destinationPath('src/scss/styles.scss')
      );
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('src/index.html'),
        { project: projectName }
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        { project: projectName }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
