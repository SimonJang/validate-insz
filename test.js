import test from 'ava';
import m from './';

test('should throw error when INSZ is invalid type', t => {
	t.throws(() => m(), 'Expected INSZ number to be a `string`, got `undefined`');
	t.throws(() => m(1), 'Expected INSZ number to be a `string`, got `number`');
});

test('should throw error when Provided INSZ number is invalid is provided', t => {
	t.false(m('foobar'), 'Provided INSZ number is invalid');
	t.false(m('213123213123123'), 'Provided INSZ number is invalid');
	t.false(m('7805.20-101.02'), 'Provided INSZ number is invalid');
	t.false(m('78.05.20101.02'), 'Provided INSZ number is invalid');
	t.false(m('78.05.20 101.02'), 'Provided INSZ number is invalid');
	t.false(m('78.05.2010102'), 'Provided INSZ number is invalid');
	t.false(m('ab78.05.20-101.02'), 'Provided INSZ number is invalid');
	t.false(m('78.05.20-101.02cd'), 'Provided INSZ number is invalid');
});

test('should return true since valid ISNZ is provided', t => {
	t.true(m('78.05.20-101.02', new Date('1978-05-20')));
	t.true(m('10.05.20-100.59', new Date('2010-05-20')));
});

test('should return true even if birthday is not provided', t => {
	t.true(m('78.05.20-101.02'));
	t.true(m('10.05.20-100.59'));
});

test('should be abble to handle different inputs', t => {
	t.true(m('78.05.20-101.02'));
	t.true(m('10052010059'));
});

test('should return false since invalid ISNZ is provided', t => {
	t.false(m('78.05.20-101.01', '1987-05-20'));
	t.false(m('10.05.20-100.73', '2010-05-20'));
});
