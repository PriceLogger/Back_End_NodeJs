const router = require('express').Router();
const Controller = require('../controller/ConfigController');
const {configChecker} = require('../middleware/bodyChecker');
const {auth, role} = require('../middleware/auth');
const config = new Controller();

router.get('/', config.get);

router.get('/:id/item', config.getItemByConfig)

router.get('/:id', auth, config.getById);

router.post('/',  configChecker, config.create);

router.patch('/:id', auth, config.updateById);

router.delete('/:id', auth, config.deleteById);

module.exports = router;