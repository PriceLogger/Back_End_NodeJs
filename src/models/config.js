const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Config.belongsToMany(models.Item, {through: models.ConfigItem});
      models.Config.belongsTo(models.User, {
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
    let User = require('../models').User;
    let Item = require('../models').Item;
    return await Config.findAll({
      include: [
        {model: Item, attributes: ['name', 'url']},
        {model: User, attributes: ['username']}
      ]
    })
  }

  Config.findAllUserAndItemById = async function (id) {
    let User = require('../models').User;
    let Item = require('../models').Item;
    return await Config.findByPk(id, {
      include: [
        {model: Item, attributes: ['name', 'url']},
        {model: User, attributes: ['username']}
      ]
    })

  }

  return Config;
};