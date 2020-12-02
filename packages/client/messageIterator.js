const messageIterator = (resolve, opts) => ({
  [Symbol.asyncIterator]() {
    return {
      async next() {

        if (this.cursor === undefined) {
          opts = await opts;
          this.count = opts.count;
          this.cursor = opts.offset;
          this.to = opts.offset + opts.limit;
          this.last = opts.root;
        }

        const value = await resolve(this.last);

        if (value && this.cursor < this.count && this.cursor <= this.to) {
          this.cursor ++;
          this.last = value.parent;
          return { done: false, value };
        } else {
          return { done: true };
        }
      }
    };
  }
});

module.exports = messageIterator;
