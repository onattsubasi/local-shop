const Campaign = require("../../models/campaign");
const doDeactivateCampaign = require("../../business/campaign/deactivateCampaign");
const expireCampaign = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const expiredCampaigns = await Campaign.find({
      endDate: { $lte: currentDate },
    }); //TODO: buraya bak, cron job ekle düzelt
    let resMsg = []
    let [resBasketMsg, resProductMsg] = await doDeactivateCampaign(
      expiredCampaigns
    );
    if (resProductMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-productCampaignDeactivated",
        resProductMsg
      );
      resMsg.push(...resProductMsg)
    }
    if (resBasketMsg.length > 0) {
      await sendMessageToKafka(
        "campaignService-basketCampaignDeactivated",
        resBasketMsg
      );
      resMsg.push(...resBasketMsg)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
expireCampaign();
module.exports = expireCampaign;
