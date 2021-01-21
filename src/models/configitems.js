const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConfigItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ConfigItem.init({
    ConfigId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ConfigItem',
  });
  return ConfigItem;
};