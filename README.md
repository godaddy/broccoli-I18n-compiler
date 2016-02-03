# broccoli-i18n-compiler

The broccoli-i18n-compile plugin compiles `.json` files into Ember.I18n translations files

This plugin assumes the language files are a flat json with the name of the file
ie `en.json` or `pt-BR.json`

You should end up with js files: `i18n-en.js` and `i18n-pt-BR.js`

#### Example Output
```
CLDR.defaultLanguage = 'da';
Ember.I18n = Ember.I18n || { };
Ember.I18n.translations = Ember.I18n.translations || { };
Ember.I18n.translations = _.extend(Ember.I18n.translations, {
  "app.title": "Min konto",
  "app.menu.accountAccess": "Adgang til konto"

  ... removed for brevity

});
```

## Installation
Add code to package.json file in the dev dependancies.
```shell
npm install broccoli-i18n-compiler
```

## Usage

```js
var i18nCompiler = require('broccoli-i18n-compiler');

var languages = i18nCompiler('i18n', {
  outputFolder: 'application/public/js'
});
```

* **`inputTree`**: Trees that act as the source

* **`options`**: A hash of options.
Options avaliable: `outputFolder`

### Example

```js
var appTranslations = emberI18nPrecompile("i18n", {outputFolder: 'js'});
```
