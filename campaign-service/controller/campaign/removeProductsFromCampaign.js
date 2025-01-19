const doRemoveProductsFromCampaign = require("../../business/campaign/removeProductsFromCampaign");
const { sendMessageToKafka } = require("../../kafka");

exports.removeProductsFromCampaign = async (req, res, next) => {
  try {
    let campaignIds = [];
    if (req.params.campaignId) {
      campaignIds.push(req.params.campaignId);
    } else {
      campaignIds = req.body.campaignIds;
    }

    const categoryIdList = req.body.categoryIdList || [];

    const brandIdList = req.body.brandIdList || [];

    const productIdList = req.body.productIdList || [];
    if (
      productIdList == null &&
      brandIdList == null &&
      categoryIdList == null
    ) {
      throw Error(
        "Given campaign can not be applied due to given Id's are empty"
      );
    }
    let resMsg = [];
    let [resBasketMsg, resProductMsg] = await doRemoveProductsFromCampaign(
      campaignIds,
      categoryIdList,
      brandIdList,
      productIdList
    );
    if (resBasketMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-campaignProductsRemovedFromBasket",
        resBasketMsg
      );
    }
      await sendMessageToKafka(
        "campaignService-campaignRemovedFromProduct",
        resProductMsg
      );
      resMsg.push(...resProductMsg);
    
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
