/* global EqualityError */
/* eslint no-sync: 0 */
/* eslint no-invalid-this: 0 */

'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var Builder = require('broccoli').Builder;
var i18nCompiler = require('..');


var fixturePath = path.join(__dirname, 'fixtures');
var expectedPath = path.join(__dirname, 'expected');

function readFileSync() {
  return fs.readFileSync.apply(this, arguments).replace(/\r\n/g, '\n');
}

describe('compile JSON language files into Ember I18n format', function () {

  it('into english', function (done) {
    var tree = i18nCompiler(fixturePath, {
      outputFolder: 'js'
    });

    var builder = new Builder(tree);
    builder.build().then(function (result) {

      var actual = readFileSync(result.directory + '/js/i18n-en.js', 'UTF-8');
      var expected = readFileSync(expectedPath + '/i18n-en.js', 'UTF-8');

      assertFileEqual(actual, expected, 'output is wrong');
      done();
    });
  });

  it('into german', function (done) {
    var tree = i18nCompiler(fixturePath, {
      outputFolder: 'js'
    });

    var builder = new Builder(tree);
    builder.build().then(function (result) {

      var actual = readFileSync(result.directory + '/js/i18n-da.js', 'UTF-8');
      var expected = readFileSync(expectedPath + '/i18n-da.js', 'UTF-8');

      assertFileEqual(actual, expected, 'output is wrong');
      done();
    });
  });

  it('allows nested destination directory', function (done) {

    var tree = i18nCompiler(fixturePath, {
      outputFolder: 'public/js'
    });

    var builder = new Builder(tree);
    builder.build().then(function (result) {
      expect(fs.existsSync(path.join(result.directory, 'public', 'js', 'i18n-en.js'))).to.be.ok;
      done();
    });
  });
});

function assertFileEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new EqualityError(message, actual, expected);
  }
}
