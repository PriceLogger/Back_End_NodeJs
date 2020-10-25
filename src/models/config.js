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
      models.Config.belongsToMany(models.Item, {through: models.ConfigItem});
      models.Config.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }
  };
  Config.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Config',
  });
  return Config;
};