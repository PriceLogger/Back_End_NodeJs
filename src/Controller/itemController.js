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
      .findAll({where: {name: provider}})
      .then(tag => {
        if (tag.length < 1) {
          res.json('No Provider founded');
        } else {
          tag = tag[0].toJSON();
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
                }
              )
              .catch(err => {
                res.send(err)
              })

          })
        }
      });

    /* req.body.item = item;
    this.create(req, res, next); */
  }


}

module.exports = ItemController;