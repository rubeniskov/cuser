const test = require('ava');
const { traverseObject } = require('./traverse');

const oneDepthObject = {
  a: 0,
  b: 1,
  c: 2,
}

const nestedObject = {
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

const recursiveObject = {
  foo: 0,
  nested: {
    depth: 1,
    nested: {
      depth: 2,
      nested: {
        depth: 3,
        nested: {
          depth: 4,
        }
      }
    }
  },
  bar: 1,
}

const iterateEqual = (t, iterator, expected) => {
  let result;
  for(let i = 0; i < expected.length; i ++) {
    const { value } = iterator();
    // console.log(value);
    t.deepEqual(value, expected[i]);
  }
  result = iterator();
  t.true(result.done);
}

test('should iterate through all entries of the given 1 depth object', (t) => {

  const expected = Object.entries(oneDepthObject).map(([k, v]) => [`/${k}`, v]);
  const ientries = traverseObject(oneDepthObject);

  iterateEqual(t, ientries, expected);
});

test('should iterate through all entries of the given object recursively flatten', (t) => {

  const expected = [
    ['/a', 0],
    ['/b', 1],
    ['/c/foo/bar/0', nestedObject.c.foo.bar[0]],
    ['/c/foo/bar/1', nestedObject.c.foo.bar[1]],
    ['/c/foo/bar/2', nestedObject.c.foo.bar[2]],
    ['/c/foo/bar/3/value/foo', nestedObject.c.foo.bar[3].value.foo],
    ['/d', 3],
  ]

  const ientries = traverseObject(nestedObject);

  iterateEqual(t, ientries, expected);
});

test('should iterate through all entries of the given object recursively', (t) => {

  const expected = [
    ['/a', 0],
    ['/b', 1],
    ['/c', nestedObject.c],
    ['/c/foo', nestedObject.c.foo],
    ['/c/foo/bar', nestedObject.c.foo.bar],
    ['/c/foo/bar/0', nestedObject.c.foo.bar[0]],
    ['/c/foo/bar/1', nestedObject.c.foo.bar[1]],
    ['/c/foo/bar/2', nestedObject.c.foo.bar[2]],
    ['/c/foo/bar/3', nestedObject.c.foo.bar[3]],
    ['/c/foo/bar/3/value', nestedObject.c.foo.bar[3].value],
    ['/c/foo/bar/3/value/foo', nestedObject.c.foo.bar[3].value.foo],
    ['/d', 3],
  ]

  const ientries = traverseObject(nestedObject, { flatten: false });

  iterateEqual(t, ientries, expected);
});

test('should iterate through 1 depth entries of the given object nested object', (t) => {

  const expected = [
    ['/a', 0],
    ['/b', 1],
    ['/c', nestedObject.c],
    ['/d', 3],
  ]

  const ientries = traverseObject(nestedObject, { flatten: false, recursive: false });

  iterateEqual(t, ientries, expected);
});

test('should iterate through filtered end with nested entries of the given object nested object flatten', (t) => {

  const expected = [
    ['/nested/depth', 1],
    ['/nested/nested/depth', 2],
    ['/nested/nested/nested/depth', 3],
    ['/nested/nested/nested/nested/depth', 4],
  ];

  const ientries = traverseObject(recursiveObject, {
    test: /\/nested/
  });

  iterateEqual(t, ientries, expected, true);
});

test('should iterate through filtered starts with nested entries of the given object nested object', (t) => {

  const expected = [
    ['/nested', recursiveObject.nested],
    ['/nested/depth', 1],
    ['/nested/nested', recursiveObject.nested.nested],
    ['/nested/nested/depth', 2],
    ['/nested/nested/nested', recursiveObject.nested.nested.nested],
    ['/nested/nested/nested/depth', 3],
    ['/nested/nested/nested/nested', recursiveObject.nested.nested.nested.nested],
    ['/nested/nested/nested/nested/depth', 4],
  ];

  const ientries = traverseObject(recursiveObject, {
    flatten: false,
    test: /\/nested/
  });

  iterateEqual(t, ientries, expected, true);
});

test('should iterate through filtered ends with nested entries of the given object nested object', (t) => {

  const expected = [
    ['/nested', recursiveObject.nested],
    ['/nested/nested', recursiveObject.nested.nested],
    ['/nested/nested/nested', recursiveObject.nested.nested.nested],
    ['/nested/nested/nested/nested', recursiveObject.nested.nested.nested.nested],
  ];

  const ientries = traverseObject(recursiveObject, {
    flatten: false,
    test: /nested$/
  });

  iterateEqual(t, ientries, expected, true);
});
