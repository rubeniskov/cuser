// @ts-check

const messageIterator = (resolve, root, {
  limit = 10,
  key = 'parent',
  skip = 0,
  map = (v, k) => v
} = {}) => ({
  [Symbol.asyncIterator]() {
    return {
      async next() {

        if (this.cursor === undefined) {
          root = await root;
          this.cursor = 0;
          this.to = skip + limit;
          this.current = root;
        }

        if (skip > 0) {
          skip --;
          await this.next();
        }

        const value = await resolve(this.current);

        if (value && this.cursor < this.to) {
          const current = this.current;
          this.cursor ++;
          this.current = value[key];
          return { done: false, value: map(value, current) };
        } else {
          return { done: true };
        }
      }
    };
  }
});

module.exports = messageIterator;
