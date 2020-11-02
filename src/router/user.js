const router = require('express').Router();
const UserController = require('../controller/UserController');
const {userBodyChecker} = require('../middleware/bodyChecker');
const {auth, role} = require('../middleware/auth');
const user = new UserController();

router.get('/', role('admin'), user.get);

router.get('/:id(\\d+)/', role('admin'), user.getById);

router.post('/', userBodyChecker, user.createNewUser);

router.patch('/me', auth, user.updateMe);

router.patch('/:id(\\d+)/', role('admin'), user.update);

router.delete('/me', auth, user.deleteMe);

router.delete('/:id(\\d+)/', role('admin'), user.deleteById);

module.exports = router;