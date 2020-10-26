const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig.json')

const roles = Object.freeze({
  anonymous: 3,
  user: 2,
  admin: 1
});

let noToken = (res) => {
  res.status(401).json({
    err: {
      code: 401,
      message: 'Vous n\'êtes pas authentifié'
    }
  })
}

let auth = (req, res, next) => {
  if (req.headers && req.headers['authorization']) {
    jwt.verify(req.headers['authorization'], jwtConfig.key, (err, result) => {
      if (err) noToken(res);
      else next();
    })
  } else {
    noToken(res);
  }
}

let role = (role) => {
  return (req, res, next) => {
    auth(req, res, () => {
      if (req.headers && req.headers['authorization']) {
        let decoded = jwt.decode(req.headers['authorization']);
        if (!roles[role] || roles[role] < decoded.role) {
          res.json({
            err: {
              message: 'Vous n\'avez pas accès à ces ressources'
            }
          });
        } else {
          next();
        }
      } else {
        res.json({
          err: {
            message: 'Vous n\'avez pas accès à ces ressources'
          }
        });
      }
    })
  }
}

module.exports = {role, auth};