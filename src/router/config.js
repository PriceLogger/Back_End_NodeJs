const router = require('express').Router();
const {check} = require('../middleware/validator');
const {isConnected} = require('../middleware/auth');
const Config = require('../models/').Config


router.get('/', async ({res}) => {
  res.json(await Config.findAllUserAndItem())
});

router.get('/:id', async (req, res) => {
  res.json(await Config.findAllUserAndItemById(req.params.id));
});

router.post('/', isConnected(), check(['name', 'description']), async (req, res) => {
  res.json(await Config.create({...req.body, UserId: req.user.id}));
});

router.post('/:configId/add/:itemId', isConnected(), async (req, res, next) => {
  try {
    res.json(await Config.addItem(req.params.configId, req.params.itemId));
  } catch (err) {
    next(err)
  }
});

/*router.patch('/:id', auth, config.update);*/

/*router.delete('/:id', auth, config.deleteById);*/

module.exports = router;