const jwt =  require('jsonwebtoken');

const Controller = require('./controller');
const bcrypt = require('bcrypt');

class UserController extends Controller {

  constructor() {
    super('User');
  }

  createNewUser = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 11);
    this.create(req, res, next);
  }

  updateMe = (req, res, next) => {
    req.params.id = jwt.decode(req.headers['authorization']).id;
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 11);
    this.updateById(req, res, next);
  }

  update = (req, res, next) => {
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 11);
    this.updateById(req, res, next);
  }

  deleteMe = (req, res, next) => {
    req.params.id = jwt.decode(req.headers['authorization']).id;
    this.deleteById();
  }

}

module.exports = UserController;