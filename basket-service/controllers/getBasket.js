const { doGetBasket } = require("../business");

exports.getBasket = async (req, res, next) => {
  let basketId = req.params.basketId;

  if (!basketId) {
    productId = req.body.basketId;
  }
  try {
    const basket = await doGetBasket(basketId);
    for (let [i, campaign] of basket.campaigns.entries()) {
      delete campaign.brandIdList;
      delete campaign.productIdList;
      delete campaign.categoryIdList;
      basket.campaigns[i] = campaign;
    }
    if (!basket) {
      return res.status(404).json("Basket not Found.");
    }
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json(error);
  }
};
