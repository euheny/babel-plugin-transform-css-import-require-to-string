Turn CSS imports and requires into strings.

## Examples

```js
import css from './styles.css';
```

```js
let css = require('./styles.css');
```

```js
const fn = (str) => {
  // some transforms
  return str;
};

fn(require('./styles.css'));
```

## Installation

```sh
$ npm install babel-plugin-transform-css-import-require-to-string
```

## Usage

#### .babelrc

```json
{
  "plugins": ["babel-plugin-transform-css-import-require-to-string"]
}
```

#### CLI

```sh
$ babel --plugins babel-plugin-transform-css-import-require-to-string script.js
```

#### Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-transform-css-import-require-to-string"]
});
```