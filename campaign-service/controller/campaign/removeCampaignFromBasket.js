const doRemoveCampaignFromBasket = require("../../business/campaign/removeCampaignFromBasket");
const doCheckProductCampaign = require("../../helpers/checkProductCampaign");
const { sendMessageToKafka } = require("../../kafka");

exports.removeCampaignFromBasket = async (req, res, next) => {
  try {
    let campaignIds = [];
    if (req.params.campaignId) {
      campaignIds.push(req.params.campaignId);
    } else {
      campaignIds = req.body.campaignIds;
    }
    let [checkProductCampaign, productCampaigns] = await doCheckProductCampaign(
      campaignIds
    );
    if (!checkProductCampaign) {
      let resMsg = await doRemoveCampaignFromBasket(campaignIds);
      await sendMessageToKafka(
        "campaignService-campaignRemovedFromBasket",
        resMsg
      );
      res.status(200).send(resMsg);
    } else {
      // if campaign is for the list
      throw new Error(
        `Given campaigns with ids: ${productCampaigns} are for lists, not products!`
      );
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
