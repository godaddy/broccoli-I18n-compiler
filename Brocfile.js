var compile = require('./index');
var exportTree = require('broccoli-export-tree');

var files = compile('i18n', {
  outputFolder: ''
});

module.exports = exportTree(files, {
  destDir: 'js'
});
