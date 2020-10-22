const models = require('../models/');

class Controller {

  constructor(table) {
    this.name = table.toLowerCase();
    this.models = models;
    this.model = this.models[table];
  }

  get = (req, res, next) => {
    this.model.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }

  create = (req, res, next) => {
    this.model.create(req.body[this.name])
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }

  updateMe = (req, res, next) => {
    this.model.update(req.body[this.name], {
      where: {
        id: req.headers['authorization'],
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }

  updateById = (req, res, next) => {
    this.model.update(req.body[this.name], {
      where: {
        id: req.params.id,
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }

  deleteMe = (req, res, next) => {
    this.model.destroy({
      where: {
        id: req.headers['authorization'],
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }

  deleteById = (req, res, next) => {
    this.model.destroy({
      where: {
        id: req.params.id,
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err))
  }
}

module.exports = Controller;