let check = (field) => {
  return (req, res, next) => {
    let correct = true;
    let missing = [];
    field.forEach(key => {
      if (!req.body.hasOwnProperty(key)) {
        missing.push(key);
        correct = false;
      }
    });

    if (correct) {
      next();
    } else {
      res.status(400).json({
        err: {
          code: 400,
          message: 'Some required fields are not filled in',
          missing: missing
        }
      });
    }
  }
}

let userBodyChecker = check(['username', 'password', 'email'])
let itemBodyChecker = check(['url']);
let providerBodyChecker = check(['name', 'priceTag', 'nameTag'])
let configChecker = check(['name', 'description'])
let loginBody = check(['username', 'password'])

module.exports = {
  userBodyChecker,
  itemBodyChecker,
  providerBodyChecker,
  configChecker,
  loginBody
};
