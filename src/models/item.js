'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Item.belongsTo(models.Provider, {
        foreignKey: {
          name: 'id_provider',
          allowNull: false
        }
      });
      models.Item.hasMany(models.ItemPrice);
      models.Item.hasMany(models.ConfigItem);
    }
  };
  Item.init({
    Name: DataTypes.STRING,
    url: DataTypes.STRING,
    id_provider: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};