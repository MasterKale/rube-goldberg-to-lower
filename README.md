# Rube Goldberg's `toLower()`

An async Node helper method for converting a string to lowercase.

## Usage

```js
const toLower = require('rube-goldberg-to-lower');

(async () => {
  const lowered = await toLower('LOUD STRING');
  console.log(lowered); // "loud string"
})();
```
