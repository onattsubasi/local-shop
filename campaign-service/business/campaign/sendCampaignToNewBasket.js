const Campaign = require("../../models/campaign");
const { sendMessageToKafka } = require("../../kafka");
const sendCampaignToNewBasket = async (basketId) => {
  try {
    let campaigns = [];
    campaigns = await Campaign.find({ applyBasket: { $in: true } });
    await sendMessageToKafka("campaignService-campaignAddedToNewBasket", {
      basketId: basketId,
      campaigns: campaigns,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendCampaignToNewBasket