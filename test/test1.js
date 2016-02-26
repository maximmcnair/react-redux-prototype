import test from 'tape';

test('A passing test1', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape1.', (assert) => {
  const expected = 'something to test';
  const actual = 'sonething to test';

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  assert.end();
});
