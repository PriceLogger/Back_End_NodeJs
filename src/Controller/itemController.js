const Controller = require('./controller');
const {getInfo, extractUrl} = require('../method/item');

class ItemController extends Controller {

  constructor() {
    super('Item');
  }

  create = (req, res, next) => {
    let url = req.body.item.url;
    let provider = extractUrl(url).hostname;
    this.models['Provider']
      .findOne({where: {name: provider}}) // Retrieve html tag from DB
      .then(tag => {
        if (!tag) throw new httpException("No Provider founded for this url", 404);
        tag = tag.toJSON();
        getInfo(url, tag, response => {
          let item = {name: response.name, providerId: tag.id, url: url};
          this.model
            .create(item)
            .then(itemRes => {
                item = itemRes.toJSON();
                let itemPrice = {price: response.price, itemId: item.id}
                this.models['ItemPrice']
                  .create(itemPrice)
                  .then(itemPriceRes => {
                    item.itemPrice = itemPriceRes.toJSON();
                    res.json(item);
                  })
                  .catch(err => {
                    this.err(err ,res);
                  });
              }
            )
            .catch(err => {
              this.err(err ,res);
            });
        })
      })
      .catch(err => {
        this.err(err ,res);
      });
  }



}

module.exports = ItemController;