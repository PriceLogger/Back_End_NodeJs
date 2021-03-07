const { CredentialError } = require("../error/httpError");
const router = require('express').Router();
const { check } = require('../middleware/validator');
const User = require('../models').User;

router.post('/', check(['username', 'password']), async(req, res, next) => {
    try {
        const user = await User.hasValidCredentials(req.body.username, req.body.password);
        if (user) res.json({ token: user.sign() })
        else next(new CredentialError());
    } catch (err) {
        next(err);
    }
});
router.post('/forgot', async(req, res) => {

});

module.exports = router;