const { CredentialError } = require("../error/httpError");
const router = require('express').Router();
const { check } = require('../middleware/validator');
const User = require('../models').User;

router.post('/', check(['username', 'password']), async(req, res, next) => {
  const user = await User.hasValidCredentials(req.body.username, req.body.password).catch(next);
  if (user) res.json({ token: user.sign().catch(next) })
});
router.post('/forgot', async(req, res) => {

});

module.exports = router;