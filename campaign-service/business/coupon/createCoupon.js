const Coupon = require("../../models/coupon")
const doCreateCoupon = async(tempCoupon)=>{
   try{
      const coupon = new Coupon(tempCoupon);
    await coupon.save();
    return coupon;
   }catch(error){
      console.log(error)
   }
}
module.exports=doCreateCoupon