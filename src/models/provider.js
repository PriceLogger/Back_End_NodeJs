'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Provider.hasMany(models.Item);
    }
  };
  Provider.init({
    name: DataTypes.STRING,
    priceTag: DataTypes.STRING,
    nameTag: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};