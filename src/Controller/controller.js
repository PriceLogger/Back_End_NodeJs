const models = require('../models/');
const httpException = require('../exception/httpException');

class Controller {

  constructor(table) {
    this.models = models;
    this.model = this.models[table];
  }

  get = (req, res) => {
    this.model.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(this.err(res))
  }

  getById = (req, res) => {
    this.model.findOne({where: {id: req.params.id}})
      .then(data => {
        if (!data) throw new httpException(this.model.name + ' not foud', 404)
        res.status(200).json(data);
      })
      .catch(this.err(res))
  }

  create = (req, res) => {
    this.model.create(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(this.err(res))
  }

  updateById = (req, res) => {
    this.model.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(this.err(res))
  }

  deleteById = (req, res) => {
    this.model.destroy({
      where: {
        id: req.params.id,
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(this.err(res))
  }

  err = (res) => {
    return (err) => {
      if (err instanceof httpException) {
        res.status(err.code).send(err.toJSON())
      } else {
        res.status(500).send({
          err: {
            code: 500,
            message: err.message,
          }
        })
      }
    }
  }


}

module.exports = Controller;