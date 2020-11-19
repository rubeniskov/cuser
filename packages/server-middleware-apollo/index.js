const Router = require('router');


module.exports = (options) => Router()
  .use((req, res) => {
    res.send('graphql')
  });
