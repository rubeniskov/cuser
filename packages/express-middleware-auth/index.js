const { v4 } = require('uuid');
const createAuth = require('@cuser/auth');
const Router = require('router');
const bodyParser = require('body-parser');
const secret = process.env.CUSER_SECRET_KEY || v4();

module.exports = (cuser, {
  headerName = 'Authorization'
} = {}) => {
  const auth = createAuth(cuser.node, secret);

  const route = (req, _, next) => {
    if (!req.headers[headerName]) {
      return res.status(401);
    }
    auth.verify(req.headers[headerName]).then((userPayload) => {
      req.user = userPayload;
      next();
    }, next);
  }

  route.authenticate = Router().use(bodyParser.json(), (req, res, next) => {
    auth.accessToken(req.body).then((accessToken) => {
      res.json({
        accessToken
      });
    }, next)
  });

  return route;
}
