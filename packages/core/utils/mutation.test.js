const test = require('ava');
const { mutate } = require('./mutation');


test('should mutate object all given object by iterator', (t) => {

  const arr = [1, 2, 3, 4, 5, 6];
  const expected = [2, 3, 4, 5, 6, 7];
  const iterator = arr[Symbol.iterator]();
  const actual = mutate(iterator, (v) => v + 1, { flatten: false});

  t.deepEqual(expected, actual);
});
