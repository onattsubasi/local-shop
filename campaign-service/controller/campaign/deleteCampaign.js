const doDeleteCampaign = require("../../business/campaign/deleteCampaign");
const { sendMessageToKafka } = require("../../kafka");

exports.deleteCampaign = async (req, res, next) => {
  try {
    const campaignId = [req.params.campaignId];
    let resMsg = [];
    let [campaign, checkBasket, checkListEmpty] = await doDeleteCampaign(
      campaignId
    );
    resMsg.push(campaign);
    if (!checkListEmpty) {
      await sendMessageToKafka(
        "campaignService-productCampaignDeleted",
        resMsg
      );
      if (checkBasket) {
        await sendMessageToKafka(
          "campaignService-basketCampaignDeleted",
          resMsg
        );
      }
    }
    await sendMessageToKafka("campaignService-campaignDeleted", resMsg);
    console.log("campaign deleted!");
    res.status(200).send(resMsg);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
