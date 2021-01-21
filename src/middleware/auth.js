const jwt = require('jsonwebtoken');
const configJwt = require('../../config/jwt.json');
const httpError = require('../error/httpError')

const tokenParser = () => {
  return async (req, res, next) => {
    if (req.headers && req.headers['authorization']) {
      jwt.verify(req.headers['authorization'], configJwt.key, (err) => {
        if (err) req.user = false;
        else req.user = jwt.decode(req.headers['authorization']);
      })
    } else {
      req.user = false
    }
    next();
  }
}

const isConnected = () => {
  return (req, res, next) => {
    if (req.user) next();
    else next(new httpError('You are not authenticated', 403));
  }
}

const role = (role) => {
  return (req, res, next) => {
    if (!req.user) next(new httpError('You are not authenticated', 403));
    else if (req.user.role.toLowerCase() === 'admin' || req.user.role.toLowerCase() === role.toLowerCase()) next();
    else next(new httpError('You don\'t have enough privilege to be here', 403));
  }
}

module.exports = {isConnected, tokenParser, role};