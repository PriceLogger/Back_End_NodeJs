const router = require('express').Router();
const Controller = require('../controller/controller');
const { userBodyChecker } = require('../middleware/bodyChecker');
const { auth, role } = require('../middleware/auth');
const user = new Controller('User');

router.get('/', user.get);

router.post('/', userBodyChecker, user.create);

router.patch('/me', auth, user.deleteMe);

router.patch('/:id',auth, role('admin'), user.updateById);

router.delete('/me', auth, user.deleteMe);

router.delete('/:id', auth, role('admin'), user.deleteById);

module.exports = router;