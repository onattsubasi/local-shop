const doUpdateCampaign = require("../../business/campaign/updateCampaign");
const { sendMessageToKafka } = require("../../kafka");

exports.updateCampaign = async (req, res, next) => {
  try {
    let campaignId = [req.params.campaignId];
    let campaignObj = {};
    campaignObj = req.body;
    let [resMsg, checkBasket] = await doUpdateCampaign(campaignId, campaignObj);

    await sendMessageToKafka("campaignService-productCampaignUpdated", resMsg);
    if (checkBasket) {
      await sendMessageToKafka("campaignService-basketCampaignUpdated", resMsg);
    }
    await sendMessageToKafka("campaignService-campaignUpdated",resMsg)
    res.status(200).send(resMsg);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
