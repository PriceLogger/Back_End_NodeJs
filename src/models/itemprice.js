const { Model } = require('sequelize');
const { MissingArrayInBody, MissingFieldInBody } = require('../error/httpError');

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
                    name: 'ItemId',
                    allowNull: false
                }
            });
        }
    };
    ItemPrice.init({
        ItemId: DataTypes.INTEGER,
        price: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ItemPrice',
    });

    ItemPrice.ingest = async function(prices) {
        if (!Array.isArray(prices)) throw new MissingArrayInBody('Prices');
        prices.forEach(price => {
            if (!price.ItemId) throw new MissingFieldInBody('ItemId');
            else if (!price.price) throw new MissingFieldInBody('price');
        });
        return await ItemPrice.bulkCreate(prices);
    }

    return ItemPrice;
};