const doUpdateFollower = require("../business/updateFollower")
exports.updateFollower = async(req,res,next)=>{
   try{
      const usageFollowerId = req.params.usageFollowerId
      const tempObj = req.body
      const resMsg = await doUpdateFollower(usageFollowerId,tempObj)
      res.status(200).send(resMsg)
   }catch(error){
      console.error(error);
      res.status(500).send(error)
   }
}