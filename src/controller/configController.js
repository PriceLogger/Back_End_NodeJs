const Controller = require('./controller');
const httpException = require('../exception/httpException');
const jwt = require('jsonwebtoken')

class ConfigController extends Controller {

  constructor() {
    super('Config');
  }

  getItemByConfig = (req, res) => {
    this.model.findAll({
      where: {
        id: req.params.id
      },
      include: [this.models.Item, this.models.User]
    }).then(config => {
      res.json(config);
    }).catch(this.err(res))
  }

  createNewConfig = (req, res, next) => {
    req.body.UserId = jwt.decode(req.headers['authorization']).id;
    this.create(req, res);
  }

  addItem = (req, res) => {
    let id = jwt.decode(req.headers['authorization']).id;
    let configItem = {
      ConfigId: req.params.configId,
      ItemId: req.params.itemId
    }
    let config = {
      id: req.params.configId,
      UserId: id.id,
    }

    //check if config exist
    let configExist = this.model.findOne({where: config})
      .then(config => {
        if (!config) throw new httpException("You don't own this config", 401)
      })

    //check for duplicate item
    let duplicateItem = this.models.ConfigItem.findOne({where: configItem})
      .then(data => {
        if (data) throw new httpException("Duplicate item in config", 422);
      })

    //add item to config
    Promise.all([configExist, duplicateItem])
      .then(() => {
        this.models.ConfigItem.create(configItem)
          .then(data => res.json(data))
          .catch(this.err(res))
      })
      .catch(this.err(res))
  }

  update = (req, res) => {
    let id = jwt.decode(req.headers['authorization']).id
    this.model.findOne({where: {id: req.params.id, UserId: id}})
      .then(data => {
        if (data) this.updateById(req, res)
      })
  }

}

module.exports = ConfigController;