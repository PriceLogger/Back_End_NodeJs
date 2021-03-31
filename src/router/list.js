const router = require('express').Router();
const { check } = require('../middleware/validator');
const { isConnected } = require('../middleware/auth');
const Config = require('../models/').Config


router.get('/', async(req, res, next) => {
  res.json(await Config.findAllUserAndItem().catch(next))
});

router.get('/:id', async(req, res, next) => {
  res.json(await Config.findAllUserAndItemById(req.params.id).catch(next))
});

router.post('/', isConnected(), check(['name', 'description']), async(req, res, next) => {
  res.json(await Config.create({...req.body, UserId: req.user.id }).catch(next))
});

router.post('/:configId/add/:itemId', isConnected(), async(req, res, next) => {
  res.json(await Config.addItem(req.params.configId, req.params.itemId)).catch(next)
});

/*router.patch('/:id', auth, config.update);*/

/*router.delete('/:id', auth, config.deleteById);*/

module.exports = router;