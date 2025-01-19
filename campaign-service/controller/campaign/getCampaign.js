const doGetCampaigns = require("../../business/campaign/getCampaigns");

exports.getCampaign = async (req, res, next) => {
  try {
    const campaignId = [req.params.campaignId];
    const resMsg = await doGetCampaigns(campaignId);
    res.status(200).send(resMsg);
  } catch (error) {
    res.status(500).send(error);
  }
};