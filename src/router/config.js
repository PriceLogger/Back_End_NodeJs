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

router.post('/', isConnected, check(['name', 'description']), (req, res) => {

});

router.post('/:configId/add/:itemId', isConnected(), (req, res) => {

});

/*router.patch('/:id', auth, config.update);*/

/*router.delete('/:id', auth, config.deleteById);*/

module.exports = router;