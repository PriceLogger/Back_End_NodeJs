const router = require('express').Router();
const Provider = require('../models/').Provider;
const { check } = require('../middleware/validator');
const { auth, role } = require('../middleware/auth');

router.get('/', async({ res }) => {
    res.json(await Provider.findAll());
});

router.post('/', role('Admin'), check(['name', 'priceTag', 'nameTag']), async(req, res) => {
    res.json(await Provider.create(req.body));
});

router.patch('/:id(\\d+)/', role('Admin'), async(req, res) => {
    res.json(Provider.findByPk(req.params.id).then((provider) => {
        let updatedProvider = {...provider, ...req.body, ... { id: req.params.id } };
        updatedProvider.save();
    }))
});

router.delete('/:id(\\d+)/', role('Admin'), async(req, res) => {
    res.json(await Provider.findByPk(req.params.id).then((provider) => {
        provider.destroy();
    }))
});

module.exports = router;