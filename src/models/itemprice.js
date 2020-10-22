'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ItemPrice.belongsTo(models.Item, {
        foreignKey: {
          name: 'id_item',
          allowNull: false
        }
      });
    }
  };
  ItemPrice.init({
    id_item: DataTypes.INTEGER,
    price: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ItemPrice',
  });
  return ItemPrice;
};