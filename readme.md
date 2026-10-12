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

The validator checks the format, month encoding, National Register sequence bounds,
and modulo-97 checksum (including the calculation for births from 2000 onward).
Supported month fields are `00`–`12` for National Register numbers and `20`–`32`
or `40`–`52` for BIS numbers. Months `00`, `20`, and `40` support unknown birth
dates; synthetic day values are preserved.

These rules follow the [IBZ National Register instructions](https://www.ibz.rrn.fgov.be/sites/default/files/documents/nl/rijksregister/onderrichtingen/IT-lijst/IT000_Rijksregisternummer.pdf)
and [BCSS BIS rules (articles 2, 4, and 5)](https://www.ksz-bcss.fgov.be/nl/page/koninklijk-besluit-van-8-februari-1991).

This does not verify that a number was issued or validate all birth-date semantics.
BIS sequence allocation limits are not checked; their existing checksum-only
handling is retained. A `true` result therefore does not establish assignability.


## License

MIT © [Simon Jang](https://github.com/SimonJang)
