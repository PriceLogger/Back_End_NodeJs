const router = require('express').Router();
const UserController = require('../controller/UserController');
const {userBodyChecker} = require('../middleware/bodyChecker');
const {auth, role} = require('../middleware/auth');
const user = new UserController();

router.get('/', role('admin'), user.get);

router.post('/', userBodyChecker, user.createNewUser);

router.patch('/me', auth, user.deleteMe);

router.patch('/:id', role('admin'), user.updateById);

router.delete('/me', auth, user.deleteMe);

router.delete('/:id', role('admin'), user.deleteById);

module.exports = router;