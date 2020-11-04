const jwtConfig = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Controller = require('./controller');

class AuthController extends Controller {

  constructor() {
    super('User');
  }

  sign = (user) => {
    return jwt.sign({
        username: user.username,
        id: user.id,
        role: 1
      },
      jwtConfig.key, {
        expiresIn: jwtConfig.expiration
      });
  }

  login = (req, res, next) => {
    this.model.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = this.sign(user);
        res.status(200).json({
          code: 200,
          status: 'connected',
          token: token
        });
      } else {
        res.status(400).json({
          err: {
            code: 401,
            message: 'Les identifiants sont incorrects!',
          }
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        err: {
          code: 500,
          message: 'Une erreur inconnue est survenue',
        }
      });
    })
  }
}

module.exports = AuthController;