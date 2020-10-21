const router = require('express').Router();
const Controller = require('../controller/controller');
const {userBodyChecker} = require('../middleware/bodyChecker');
const user = new Controller('User');

router.get('/', user.get);

router.post('/', userBodyChecker, user.create);

router.patch('/:id', user.updateById);

router.delete('/:id', user.deleteById);

module.exports = router;