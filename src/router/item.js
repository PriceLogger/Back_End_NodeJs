const router = require('express').Router();
const Item = require('../models/').Item;
const ItemPrice = require('../models/').ItemPrice;
const { check, hasBody } = require('../middleware/validator');
const { role } = require('../middleware/auth');

router.get('/', async({ res }) => {
    res.json(await Item.findAll({ include: ItemPrice }));
});

router.get('/:id(\\d+)/', async(req, res) => {
    res.json(await Item.findByPk(req.params.id, { include: ItemPrice }));
});

router.post('/', check(['url']), async(req, res, next) => {
    try {
        res.json(await Item.new(req.body.url))
    } catch (err) {
        next(err);
    }
});

router.post('/price', hasBody(), role('worker'), async(req, res, next) => {
    try {
        res.json(await ItemPrice.ingest(req.body));
    } catch (err) {
        next(err);
    }
})

/*router.patch('/:id', role('admin'), item.updateById);

router.delete('/:id', role('admin'), item.deleteById);*/

module.exports = router;