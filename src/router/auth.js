const router = require('express').Router();
const AuthController = require('../controller/authController');
const {loginBody} = require('../middleware/bodyChecker');

const auth = new AuthController();

router.post('/', loginBody, auth.login);

router.post('/forgot', (req, res) => {
  /*  mail.forgot(req, res); */
});

module.exports = router;