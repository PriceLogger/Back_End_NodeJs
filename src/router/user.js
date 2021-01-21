const router = require('express').Router();
const {role} = require('../middleware/auth');
const {hasBody} = require('../middleware/validator');
const User = require('../models/').User;

router.get('/', role('admin'), async ({res}) => {
  res.json(await User.findAll());
});

router.get('/:id(\\d+)/', role('admin'), async (req, res) => {
  res.json(await User.find({where: {id: req.params.id}}));
});

router.patch('/me', hasBody(), async (req, res) => {
  res.json(await User.updateMe(req.body, req.user))
});

router.delete('/me', async (req, res) => {
  res.json(await User.deleteMe(req.user))
});

router.delete('/:id(\\d+)/', role('admin'), async (req, res) => {
  res.json(await User.deleteById(req.params.id))
});

module.exports = router;