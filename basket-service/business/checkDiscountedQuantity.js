const checkDiscountedQuantity = async(basket)=>{
  try{
    let products = basket.products
    let campaignedProducts = products.filter((product)=>product.discountSource==="product"&&product.appliedCampaign)
    campaignedProducts.forEach((product) => {
      if (product.quantity > product.appliedCampaign.maxLimitInProduct) {
        product.quantity = product.appliedCampaign.maxLimitInProduct;
      }
    });
    return basket
  }catch(error){
    console.log(error)
    throw error
  }

}
module.exports = checkDiscountedQuantity