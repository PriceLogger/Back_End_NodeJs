let check = (model, field) => {
  return (req, res, next) => {
    model = model.toLowerCase();
    let correct = true;
    let missing = {};
    let comp = 0;
    if (req.body == "undefined" || !req.body || (req.body && !req.body[model])) {
      missing.object = model;
      missing.value = {...field};
      correct = false;
    } else {
      let body = req.body[model];
      field.forEach(key => {
        if (!body.hasOwnProperty(key)) {
          missing.value = missing.value == null ? {} : missing.value;
          missing.value[comp] = key;
          correct = false;
          comp++;
        }
      });
    }

    if (correct) {
      next();
    } else {
      res.status(400).json({
        err: {
          code: 400,
          message: 'Some required fields are not filled in',
          missing
        }
      });
    }
  }
}

let userBodyChecker = check('user', ['username', 'password', 'email'])
let itemBodyChecker = check('item', ['url']);
let providerBodyChecker = check('provider', ['name', 'priceTag', 'nameTag'])

module.exports = {
  userBodyChecker,
  itemBodyChecker,
  providerBodyChecker
};
