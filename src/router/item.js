const router = require('express').Router();
const ItemController = require('../controller/itemController');
const { itemBodyChecker } = require('../middleware/bodyChecker');
const { auth, role } = require('../middleware/auth');
const item = new ItemController();

router.get('/', item.get);

router.post('/', itemBodyChecker, item.create);

router.patch('/:id', auth, role('admin'), item.updateById);

router.delete('/:id', auth, role('admin'), item.deleteById);

module.exports = router;