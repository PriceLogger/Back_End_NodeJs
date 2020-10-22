'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfigItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ConfigItem.belongsTo(models.Config, {
        foreignKey: {
          name: 'configId',
          allowNull: false
        }
      });
      models.ConfigItem.belongsTo(models.Item, {
        foreignKey: {
          name: 'itemId',
          allowNull: false
        }
      });
    }
  };
  ConfigItem.init({
    id_configs: DataTypes.INTEGER,
    id_item: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ConfigItem',
  });
  return ConfigItem;
};