# validate-insz [![Build Status](https://travis-ci.org/SimonJang/validate-insz.svg?branch=master)](https://travis-ci.org/SimonJang/validate-insz)

> Validate Belgian INSZ numbers


## Install

```
$ npm install validate-insz
```


## Usage

```js
const validateInsz = require('validate-insz');

validateInsz('78.05.20-101.02');
//=> true

validateInsz('78.05.20-101.99');
//=> false
```


## API

### validateInsz(input)

#### input

Type: `string`

INSZ number to be validated.


## License

MIT © [Simon Jang](https://github.com/SimonJang)
