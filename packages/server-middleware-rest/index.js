const Router = require('router');
const bodyParser = require('body-parser');
const { version } = require('./package.json');

// const catchError = (req, res) =>
module.exports = (cuser = require('@cuser/core')(), {
  swagger = true,
} = {}) => {
  const router = Router()
  .use(bodyParser.json())
    .get('/v1/message', (req, res) => {
      cuser.query(req.query).then((data) => {
        res.json(data);
      }, (err) => {
        res.json({
          message: err.message,
          errors: err.errors,
        });
      });
    })
    .post('/v1/message', (req, res) => {
      cuser.publish(req.body).then((data) => {
        res.json(data);
      }, (err) => {
        res.json({
          message: err.message,
          errors: err.errors,
        });
      });
    })
    .patch('/v1/message', (req, res) => {
      const { resource } = req.params;
      cuser.update(req.body).then((data) => {
        res.json(data);
      }, (err) => {
        res.json({
          message: err.message,
          errors: err.errors,
        });
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
