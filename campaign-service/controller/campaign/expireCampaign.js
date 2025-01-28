const Campaign = require("../../models/campaign");
const cron = require("node-cron");
const doDeactivateCampaign = require("../../business/campaign/deactivateCampaign");
const scheduleCampaignJobs = async () => {
  const campaigns = await Campaign.find({ isActive: true });

  campaigns.forEach((campaign) => {
    const endDate = new Date(campaign.endDate);
    const cronTime = `${endDate.getMinutes()} ${endDate.getHours()} ${endDate.getDate()} ${
      endDate.getMonth() + 1
    } *`;

    cron.schedule(cronTime, async () => {
      console.log(`Deactivating campaign: ${campaign._id}`);
      await expireCampaign(campaign._id);
    });
  });
};

async function expireCampaign(campaignId) {
  try {
    const expiredCampaign = await Campaign.find({
      id: campaignId,
    });
    let resMsg = [];
    let [resBasketMsg, resProductMsg] = await doDeactivateCampaign([
      expiredCampaign,
    ]);
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
  } catch (error) {
    console.log(error);
    throw new Error("Error in expireCampaign");
  }
}
expireCampaign();
module.exports = { scheduleCampaignJobs };
