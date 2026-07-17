# validate-insz [![CI](https://github.com/SimonJang/validate-insz/actions/workflows/ci.yml/badge.svg)](https://github.com/SimonJang/validate-insz/actions/workflows/ci.yml)

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

validateInsz('78052010102');
//=> true

validateInsz('78.05.20-101.99');
//=> false

validateInsz('78052010199');
//=> false
```


## API

### validateInsz(input)

#### input

Type: `string`

INSZ number to be validated. This can be formatted or just the sequence of numbers.


## License

MIT © [Simon Jang](https://github.com/SimonJang)
