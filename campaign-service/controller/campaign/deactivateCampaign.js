const doDeactivateCampaign = require("../../business/campaign/deactivateCampaign");
const { sendMessageToKafka } = require("../../kafka");
exports.deactivateCampaign = async (req, res, next) => {
  try {
    let campaignIds = [];
    if (req.params.campaignId) {
      campaignIds.push(req.params.campaignId);
    } else {
      campaignIds = req.body.campaignIds;
    }
    let resMsg = [];
    let [resBasketMsg, resProductMsg] = await doDeactivateCampaign(campaignIds);
    if (resProductMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-productCampaignDeactivated",
        resProductMsg
      );
      resMsg.push(...resProductMsg);
    }
    if (resBasketMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-basketCampaignDeactivated",
        resBasketMsg
      );
      resMsg.push(...resBasketMsg);
    }

    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
