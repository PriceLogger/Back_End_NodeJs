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
      Item.hasMany(models.ItemPrice);
      Item.belongsToMany(models.Config, {through: models.ConfigItem})
      Item.belongsTo(models.Provider, {
        foreignKey: {
          name: 'ProviderId',
          allowNull: false,
        }
      });
    }
  };
  Item.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    ProviderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};