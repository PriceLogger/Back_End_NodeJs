'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Config.belongsTo(models.User, {
        foreignKey: {
          name: 'id_user',
          allowNull: false
        }
      });
    }
  };
  Config.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Config',
  });
  return Config;
};