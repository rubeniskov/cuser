const test = require('ava');
const { entries } = require('./iterator');


test('should iterate through all entries of the given object', (t) => {
  const object = {
    a: 0,
    b: 1,
    c: 2,
  }
  const oentries = Object.entries(object);
  const ientries = entries(object);

  let idx = 0;
  for(let entry of ientries) {
    t.deepEqual(oentries[idx++], entry);
  }
});

test('should iterate through all entries of the given object recursively flatten', (t) => {
  const object = {
    a: 0,
    b: 1,
    c: {
      foo: {
        bar: [1, 2, 3, {
          value: {
            foo: 'bar'
          }
        }]
      }
    },
    d: 3
  }

  const expected = [
    ['a', 0],
    ['b', 1],
    ['c.foo.bar.0', object.c.foo.bar[0]],
    ['c.foo.bar.1', object.c.foo.bar[1]],
    ['c.foo.bar.2', object.c.foo.bar[2]],
    ['c.foo.bar.3.value.foo', object.c.foo.bar[3].value.foo],
    ['d', 3],
  ]

  const ientries = entries(object, { recursive: true });

  let idx = 0;
  for(let entry of ientries) {
    console.log(entry, expected[idx]);
    t.deepEqual(entry, expected[idx++])
  }
});

test('should iterate through all entries of the given object recursively', (t) => {
  const object = {
    a: 0,
    b: 1,
    c: {
      foo: {
        bar: [1, 2, 3, {
          value: {
            foo: 'bar'
          }
        }]
      }
    },
    d: 3
  }

  const expected = [
    ['a', 0],
    ['b', 1],
    ['c', object.c],
    ['c.foo', object.c.foo],
    ['c.foo.bar', object.c.foo.bar],
    ['c.foo.bar.0', object.c.foo.bar[0]],
    ['c.foo.bar.1', object.c.foo.bar[1]],
    ['c.foo.bar.2', object.c.foo.bar[2]],
    ['c.foo.bar.3', object.c.foo.bar[3]],
    ['c.foo.bar.3.value', object.c.foo.bar[3].value],
    ['c.foo.bar.3.value.foo', object.c.foo.bar[3].value.foo],
    ['d', 3],
  ]

  const ientries = entries(object, { recursive: true, flatten: false });

  let idx = 0;
  for(let entry of ientries) {
    console.log(entry, expected[idx]);
    t.deepEqual(entry, expected[idx++])
  }
});

