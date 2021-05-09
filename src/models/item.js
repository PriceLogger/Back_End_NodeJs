const HttpError = require("../error/httpError");
const { Model, Op } = require('sequelize');
const { fetchItem, extractUrl } = require('../method/item');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.ItemPrice);
      this.belongsToMany(models.Config, { through: models.ConfigItem })
      this.belongsTo(models.Provider, {
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

  Item.findByString = async function(name) {
    return await Item.findAll({
      where: {
        name: {
          [Op.substring]: name
        }
      }
    })
  }

  Item.new = async function(url) {
    const Provider = require('../models/').Provider;
    const ItemPrice = require('../models/').ItemPrice;

    // Find item in DB
    let item = await Item.findOne({ where: { url: url }, include: ItemPrice })

    if (item) return item; // item is in DB
    else { //not found i db

      // Retrieve html tag from DB
      let tag = await Provider.findOne({ where: { name: extractUrl(url).hostname } })
      if (!tag) throw new HttpError("No Provider founded for this url", 404);

      // Fetch name and price from web page
      let itemInfo = await fetchItem(url, tag.dataValues)

      // Create a new item
      item = await Item.create({ name: itemInfo.name, ProviderId: tag.dataValues.id, url: url })

      // Create a new price for the new item
      await ItemPrice.create({ price: itemInfo.price, ItemId: item.dataValues.id })

      // Get the created item from db
      item = await Item.findOne({ where: { id: item.dataValues.id }, include: ItemPrice })

      return item;
    }
  }

  return Item;
};