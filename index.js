'use strict';
var regex = /^\d{2}.\d{2}.\d{2}-\d{3}.\d{2}$/;
var altRegex = /^\d{11}$/;

var clean = function (insz) {
	return insz.replace(/[.-]/g, '');
};

var calculate = function (modulo, checksum) {
	var rest = parseInt(modulo, 10) % 97;

	return 97 - rest === checksum;
};

/**
 * Validates the INSZ
 *
 * @param {String} 	insz 		INSZ number of format `xx.xx.xx-xxx.xx` or `xxxxxxxxxxx`
 */
module.exports = function (insz) {
	if (typeof insz !== 'string') {
		throw new TypeError('Expected INSZ number to be a `string`, got `' + (typeof insz) + '`');
	}

	if (!regex.test(insz) && !altRegex.test(insz)) {
		throw new TypeError('Provided INSZ number is invalid');
	}

	var cleanedSSN = clean(insz);

	var moduloCheckString = cleanedSSN.slice(0, cleanedSSN.length - 2);
	var checksum = parseInt(cleanedSSN.slice(cleanedSSN.length - 2), 10);

	return calculate(moduloCheckString, checksum) || calculate('2' + moduloCheckString, checksum);
};
