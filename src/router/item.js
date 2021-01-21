const router = require('express').Router();
const Item = require('../models/').Item;
const {check} = require('../middleware/validator');
const {role} = require('../middleware/auth');

router.get('/', async ({res}) => {
  res.json(await Item.findAll());
});

router.get('/:id(\\d+)/', async (req, res) => {
  res.json(Item.findByPk(req.params.id));
});

router.post('/', check(['url']), async (req, res, next) => {
  try {
    let item = await Item.new(req.body.url);
    res.json(item)
  } catch (err) {
    next(err);
  }
});

/*router.patch('/:id', role('admin'), item.updateById);

router.delete('/:id', role('admin'), item.deleteById);*/

module.exports = router;