const doActivateCampaign = require("../../business/campaign/activateCampaign");
const { sendMessageToKafka } = require("../../kafka");
exports.activateCampaign = async (req, res, next) => {
  try {
    let campaignIds = [];
    if (req.params.campaignId) {
      campaignIds.push(req.params.campaignId);
    } else {
      campaignIds = req.body.campaignIds;
    }
    let resMsg = [];
    let [resBasketMsg, resProductMsg] = await doActivateCampaign(campaignIds);
    if (resProductMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-productCampaignActivated",
        resProductMsg
      );
      resMsg.push(...resProductMsg);
    }
    if (resBasketMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-basketCampaignActivated",
        resBasketMsg
      );
      resMsg.push(...resBasketMsg);
    }
    res.status(200).send(resMsg)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
