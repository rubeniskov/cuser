const Router = require('router');
const bodyParser = require('body-parser');
const { version } = require('./package.json');

module.exports = (cuser = require('@cuser/core')(), {
  swagger = true,
} = {}) => {
  const router = Router()
  .use(bodyParser.json())
    .get('/v1/message', (req, res) => {
      cuser.query(req.query).then((data) => {
        res.json(data);
      });
    })
    .post('/v1/message', (req, res) => {
      cuser.publish(req.body).then((data) => {
        res.json(data);
      });
    })
    .patch('/v1/message', (req, res) => {
      const { resource } = req.params;
      cuser.update(req.body).then((data) => {
        res.json(data);
      });
    })
    .delete('/v1/message', (req, res) => {
      cuser.delete(req.body).then((data) => {
        res.json(data);
      });
    });

  if (swagger) {
    router.use(require('./swagger')());
  }

  return router.use('/', (_, res) => {
    res.json({
      version
    });
  });
};
