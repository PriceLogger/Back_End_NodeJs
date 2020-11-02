const router = require('express').Router();
const Controller = require('../controller/ConfigController');
const {configChecker} = require('../middleware/bodyChecker');
const {auth, role} = require('../middleware/auth');
const config = new Controller();

router.get('/', auth, config.get);

router.get('/:id', auth, config.getItemByConfig);

router.post('/', auth, configChecker, config.createNewConfig);

router.post('/:configId/add/:itemId', auth, config.addItem);

router.patch('/:id', auth, config.updateById);

router.delete('/:id', auth, config.deleteById);

module.exports = router;