const router = require('express').Router();
const Controller = require('../controller/controller');
const { itemBodyChecker } = require('../middleware/bodyChecker');
const { auth, role } = require('../middleware/auth');
const provider = new Controller('Provider');

router.get('/', provider.get);

router.post('/', itemBodyChecker, role('admin'), provider.create);

router.patch('/:id', auth, role('admin'), provider.updateById);

router.delete('/:id', auth, role('admin'), provider.deleteById);

module.exports = router;