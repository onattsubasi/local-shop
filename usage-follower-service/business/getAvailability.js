const UsageFollower = require("../models/usageFollower");
const doGetAvailability = async(userId,campaignId,couponId)=>{
  try{
    let query={}
    query = couponId?{couponId:couponId}:{campaignId:campaignId};
    const usageFollower = UsageFollower.findOne(query)
    const availability = usageFollower.userUsageCount.get(userId)
    return availability
  }catch(error){
    console.error(error)
  }
}
module.exports = doGetAvailability