/*eslint no-sync: 0*/

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Writer = require('broccoli-writer');
var Constructor = require('util').inherits;

module.exports = I18nCompiler;
Constructor(I18nCompiler, Writer);

function I18nCompiler(inputTree, options) {
  if (!(this instanceof I18nCompiler)) {
    return new I18nCompiler(inputTree, options);
  }

  this.inputTree = inputTree;

  Object.keys(options || {}).forEach(function (key) {
    this[key] = options[key];
  }, this);
}

I18nCompiler.prototype.write = function (readTree, destDir) {
  var myDestDir = path.join(destDir, this.outputFolder);

  return readTree(this.inputTree).then(function (srcDir) {
    var files = fs.readdirSync(srcDir).filter(function (d) {
      var stats = fs.statSync(path.join(srcDir, d));
      return d[0] !== '.' && !stats.isDirectory(); // Just exclude anything which starts with a . and isn't a directory
    });

    // setup the output-folder
    mkdirp.sync(myDestDir);

    files.forEach(function (file) {
      var locale = file.replace(/\.json$/, '').replace(/i18n\//, '');
      var outputFile = path.join(myDestDir, 'i18n-' + locale + '.js');
      var inputFilePath = path.join(srcDir, file);

      var content = fs.readFileSync(inputFilePath, { encoding: 'utf8' });
      var outputString = processFile(content, file);

      fs.writeFileSync(outputFile, outputString);
    });
  });
}

function processFile(string, file) {
  var locale = file.replace(/\.json$/, '').replace(/i18n\//, '');

  var out = '';

  // Ember i18n translations
  out += 'if(typeof Translations === \'undefined\') {\n'
  out += '  var Translations = {} };\n'
  out += 'Translations.locale = \'' + locale + '\';\n';
  out += 'Translations.translations = Translations.translations || {};\n';
  out += 'Translations.translations = _.extend(Translations.translations, ';
  out += string + ');\n';

  return out;
}
