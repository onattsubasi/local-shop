const doGetCampaigns = require("../../business/campaign/getCampaigns");

exports.getAllCampaign = async (req, res, next) => {
  try {
    const resMsg = await doGetCampaigns("all");
    res.status(200).json(resMsg);
  } catch (error) {
    throw new Error(error);
  }
};
