const doCreateCampaign = require("../../business/campaign/createCampaign");
const { sendMessageToKafka } = require("../../kafka");
exports.createCampaign = async (req, res, next) => {
  try {
    let tempCamp = {};
    tempCamp = req.body
    tempCamp.categoryIdList = req.body.categoryIdList || [];
    tempCamp.brandIdList = req.body.brandIdList || [];
    tempCamp.productIdList = req.body.productIdList || [];
    // tempCamp.mergeWithOtherCampaigns = req.body.mergeWithOtherCampaigns;
    let resMsg = []
    resMsg.push(await doCreateCampaign(tempCamp))
    if (
      tempCamp.productIdList.length>0 ||
      tempCamp.brandIdList.length>0 ||
      tempCamp.categoryIdList.length>0
    ) {
      await sendMessageToKafka("campaignService-productCampaignCreated", resMsg);
      if (tempCamp.applyBasket) {
        await sendMessageToKafka(
          "campaignService-basketCampaignCreated",
          resMsg
        );
      }
    }
    await sendMessageToKafka("campaignService-campaignCreated",resMsg)
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
