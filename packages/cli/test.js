const test = require('ava');
const execa = require('execa');

test.cb('dummy test', (t) => {
  const subprocess = execa('./index.js');

  setTimeout(() => {
    subprocess.cancel();
    t.end();
	}, 1000);
});
