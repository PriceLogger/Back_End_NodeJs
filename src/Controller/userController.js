const Controller = require('./controller');
const bcrypt = require('bcrypt');

class UserController extends Controller {

  constructor() {
    super('User');
  }

  createNewUser = (req, res, next) => {
    req.body.user.password = bcrypt.hashSync(req.body.user.password, 11);
    this.create(req, res, next);
  }
}

module.exports = UserController;