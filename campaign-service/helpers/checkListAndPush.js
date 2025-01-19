const mongoose = require("mongoose")
const doCheckListAndPush = (List, campaignList) => {
  if (List) {
    let existProductId = campaignList.map((item) => item.toString());
    let tempList = [
      ...existProductId,
      ...List.filter((item) => !existProductId.includes(item)),
    ];
    let newList;
    newList = tempList.map((id) =>
      mongoose.Types.ObjectId.createFromHexString(id)
    );
    return newList;
  }
  return campaignList;
};
module.exports = doCheckListAndPush;

