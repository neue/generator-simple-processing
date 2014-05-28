'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var SimpleProcessingGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay("Let's build a simple Processing.js Sketch!"));

    var prompts = [{
	    name: 'sketchName',
	    message: 'What do you want to call this sketch?'
    }];

    this.prompt(prompts, function (props) {
      this.sketchName = props.sketchName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('index.html', 'index.html');
    this.copy('style.css', 'style.css');
    this.copy('sketch.pde', this._.slugify(this.sketchName)+'.pde');
  },

  // projectfiles: function () {
  //   this.copy('editorconfig', '.editorconfig');
  //   this.copy('jshintrc', '.jshintrc');
  // }
});

module.exports = SimpleProcessingGenerator;
