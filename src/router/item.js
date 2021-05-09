const router = require('express').Router();
const Item = require('../models/').Item;
const ItemPrice = require('../models/').ItemPrice;
const { check, hasBody } = require('../middleware/validator');
const { role } = require('../middleware/auth');
const { IdIsNotInt } = require('../error/httpError');

router.get('/', async(req, res, next) => {
  let option = {};
  if (req.query.price === 'true') option = { include: ItemPrice }
  res.json(await Item.findAll(option).catch(next));
});

router.get('/:id(\\d+)/', async(req, res, next) => {
  res.json(await Item.findByPk(req.params.id, { include: ItemPrice }).catch(next));
});

router.post('/', check(['url']), async(req, res, next) => {
  res.json(await Item.new(req.body.url).catch(next))
});

router.post('/price', hasBody(), role('worker'), async(req, res, next) => {
  res.json(await ItemPrice.ingest(req.body).catch(next));
})

/*router.patch('/:id', role('admin'), item.updateById);

router.delete('/:id', role('admin'), item.deleteById);*/

module.exports = router;