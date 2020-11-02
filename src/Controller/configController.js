const Controller = require('./controller');
const httpException = require('../exception/httpException');
const {getInfo, extractUrl} = require('../method/item');
const jwt = require('jsonwebtoken')

class ConfigController extends Controller {

  constructor() {
    super('Config');
  }

  getItemByConfig = (req, res, next) => {
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
    let decoded = jwt.decode(req.headers['authorization']);
    req.body.UserId = decoded.id;
    this.create(req, res, next);
  }

  addItem = (req, res, next) => {
    let decoded = jwt.decode(req.headers['authorization']);
    let configItem = {
      ConfigId: req.params.configId,
      ItemId: req.params.itemId
    }
    let config = {
      id: req.params.configId,
      UserId: decoded.id,
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
      .then(data => {
        this.models.ConfigItem.create(configItem)
          .then(data => res.json(data))
          .catch(this.err(res))
      })
      .catch(this.err(res))
  }


}

module.exports = ConfigController;