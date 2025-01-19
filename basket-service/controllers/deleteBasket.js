const { doDeleteBasket } = require("../business");

exports.deleteBasket = async (req, res, next) => {
  const basketId = req.params.basketId;
  const resMsg = await doDeleteBasket(basketId);
  res.status(200).send(resMsg);
};