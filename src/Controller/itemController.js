const Controller = require('./controller');
const {fetchItem, extractUrl} = require('../method/item');
const httpException = require('../exception/httpException');

class ItemController extends Controller {

  constructor() {
    super('Item');
  }

  create = async (req, res, next) => {
    let url = req.body.url;
    let provider = extractUrl(url).hostname;
    let tag;
    let item;

    try {
      // Find item in DB
      item = await this.model.findOne({where: {url: url}, include: this.models.ItemPrice})
      if (item) res.json(item); // item is in DB
      else {
        // Retrieve html tag from DB
        tag = await this.models.Provider.findOne({where: {name: provider}})
        if (!tag) throw new httpException("No Provider founded for this url", 404);

        // Fetch name and price from web page
        let itemInfo = await fetchItem(url, tag.dataValues)

        // Create a new item
        item = await this.model.create({name: itemInfo.name, ProviderId: tag.dataValues.id, url: url})

        // Create a new price for the new item
        await this.models['ItemPrice'].create({price: itemInfo.price, ItemId: item.dataValues.id})

        item = await this.model.findOne({where: {id: item.dataValues.id}, include: this.models.ItemPrice})

        res.json(item)
      }
    } catch (err) {
      this.err(res)(err);
    }

  }

}

module.exports = ItemController;