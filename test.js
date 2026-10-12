'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const m = require('./');

test('should throw error when INSZ is invalid type', t => {
	assert.throws(() => m(), {
		message: 'Expected INSZ number to be a `string`, got `undefined`'
	});
	assert.throws(() => m(1), {
		message: 'Expected INSZ number to be a `string`, got `number`'
	});
});

test('should throw error when Provided INSZ number is invalid is provided', t => {
	assert.equal(m('foobar'), false);
	assert.equal(m('213123213123123'), false);
	assert.equal(m('7805.20-101.02'), false);
	assert.equal(m('78.05.20101.02'), false);
	assert.equal(m('78.05.20 101.02'), false);
	assert.equal(m('78.05.2010102'), false);
	assert.equal(m('ab78.05.20-101.02'), false);
	assert.equal(m('78.05.20-101.02cd'), false);
});

test('should reject undocumented separators', () => {
	assert.equal(m('78-05.20-101.02'), false);
	assert.equal(m('78.05-20-101.02'), false);
	assert.equal(m('78-05-20-101-02'), false);
	assert.equal(m('78.05.20-101-02'), false);
});

test('should reject unassignable National Register sequences', () => {
	assert.equal(m('78.05.20-000.06'), false);
	assert.equal(m('78052000006'), false);
	assert.equal(m('78.05.20-999.74'), false);
	assert.equal(m('78052099974'), false);
	assert.equal(m('40.00.00-999.35'), false);
	assert.equal(m('40000099935'), false);
});

test('should accept assignable National Register sequence boundaries', () => {
	assert.equal(m('78.05.20-001.05'), true);
	assert.equal(m('78052099875'), true);
	assert.equal(m('40.00.01-001.33'), true);
});

test('should apply National Register sequence bounds through December', () => {
	assert.equal(m('78.12.20-000.55'), false);
	assert.equal(m('78122000055'), false);
	assert.equal(m('78.12.20-999.26'), false);
	assert.equal(m('78122099926'), false);
	assert.equal(m('78.12.20-001.54'), true);
	assert.equal(m('78122000154'), true);
	assert.equal(m('78.12.20-998.27'), true);
	assert.equal(m('78122099827'), true);
});

test('should reject unsupported month encodings despite a valid checksum', () => {
	for (const input of [
		'78.13.20-001.61',
		'78.19.20-101.03',
		'78.33.20-101.04',
		'78.39.20-101.46',
		'78.53.20-101.47',
		'78.59.20-101.89',
		'78.60.20-101.96',
		'78.99.20-101.78'
	]) {
		assert.equal(m(input), false, input);
		assert.equal(m(input.replace(/[.-]/g, '')), false, input);
	}
});

test('should accept documented BIS month encodings with either checksum century', () => {
	// Synthetic fixtures cover +20/+40 month offsets and unknown months (20/40).
	for (const input of [
		'78.20.00-101.28',
		'78.21.01-101.05',
		'78.25.20-101.45',
		'78.32.01-101.82',
		'78.40.00-102.70',
		'78.41.01-101.48',
		'78.45.20-102.87',
		'78.52.01-102.27',
		'10.25.20-101.04',
		'10.45.20-102.46'
	]) {
		assert.equal(m(input), true, input);
		assert.equal(m(input.replace(/[.-]/g, '')), true, input);
	}
});

test('should preserve unknown-date and synthetic-day encodings', () => {
	for (const input of [
		'40.00.32-001.73',
		'00.40.01-101.52',
		'78.20.32-101.38',
		'78.40.32-102.80'
	]) {
		assert.equal(m(input), true, input);
		assert.equal(m(input.replace(/[.-]/g, '')), true, input);
	}
});

test('should reject invalid checksums for BIS numbers', () => {
	for (const input of [
		'78.25.20-101.44',
		'78.45.20-102.86',
		'10.25.20-101.03',
		'10.45.20-102.45'
	]) {
		assert.equal(m(input), false, input);
		assert.equal(m(input.replace(/[.-]/g, '')), false, input);
	}
});

test('should return true since valid ISNZ is provided', t => {
	assert.equal(m('78.05.20-101.02', new Date('1978-05-20')), true);
	assert.equal(m('10.05.20-100.59', new Date('2010-05-20')), true);
});

test('should return true even if birthday is not provided', t => {
	assert.equal(m('78.05.20-101.02'), true);
	assert.equal(m('10.05.20-100.59'), true);
});

test('should be abble to handle different inputs', t => {
	assert.equal(m('78.05.20-101.02'), true);
	assert.equal(m('10052010059'), true);
});

test('should return false since invalid ISNZ is provided', t => {
	assert.equal(m('78.05.20-101.01', '1987-05-20'), false);
	assert.equal(m('10.05.20-100.73', '2010-05-20'), false);
});
