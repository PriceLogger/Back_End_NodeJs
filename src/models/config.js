const {Model} = require('sequelize');
const httpError = require('../error/httpError');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Item, {through: models.ConfigItem});
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
          allowNull: false
        }
      });
    }
  };
  Config.init({
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Config',
  });


  Config.findAllUserAndItem = async function () {
    return await Config.findAll({
      include: [
        {
          model: require('../models').Item,
          attributes: ['id', 'name', 'url'],
          include: {
            model: require('../models').ItemPrice,
            attributes: ['id', 'ItemId', 'price']
          },
        },
        {
          model: require('../models').User,
          attributes: ['username']
        }
      ]
    })
  }

  Config.findAllUserAndItemById = async function (id) {
    return await Config.findByPk(id, {
      include: [
        {
          model: require('../models').Item,
          attributes: ['id', 'name', 'url'],
          include: {
            model: require('../models').ItemPrice,
            attributes: ['id', 'ItemId', 'price']
          },
        },
        {
          model: require('../models').User,
          attributes: ['username']
        }
      ]
    })
  }

  Config.addItem = async function (idConfig, idItem) {
    const Config = require('../models').Config;
    const Item = require('../models').Item;

    // Search item and config
    let item = await Item.findByPk(idItem);
    let config = await Config.findByPk(idConfig);

    if (!item || !config) throw new httpError("No item or config found", 403);

    // Insert new configItem
    const ConfigItem = require('../models').ConfigItem;
    return await ConfigItem.findOrCreate({
      where: {
        ConfigId: idConfig,
        ItemId: idItem
      },
      defaults: {
        ConfigId: idConfig,
        ItemId: idItem
      }
    });
  }

  return Config;
};