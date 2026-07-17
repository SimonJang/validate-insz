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
