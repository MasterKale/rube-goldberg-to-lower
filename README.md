# Rube Goldberg's `toLower()`

An async Node helper method for converting a string to lowercase.

## Usage

```js
const toLower = require('rg-toLower');

(async () => {
  const lowered = await toLower('LOUD STRING');
  console.log(lowered); // "loud string"
})();
```
