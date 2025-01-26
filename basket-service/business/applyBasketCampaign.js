const axios = require("axios");

const applyBasketCampaign = async (basket) => {
  try {
    let products = basket.products;
    let userId = basket.user.userId;
    let userType = basket.user.userType;
    let coupon = basket.appliedCoupon;
    let activatedCampaigns = [];
    let activeCampaigns =
      basket.campaigns?.filter((campaign) => campaign.isActive) || [];
    activeCampaigns = activeCampaigns?.filter((campaign) =>
      userType.includes(campaign?.targetUserType)
    );

    const { totalPrice } = products.reduce(
      (acc, product) => ({
        totalPrice: acc.totalPrice + product.price * product.quantity,
      }),
      { totalPrice: 0 }
    );

    activeCampaigns = activeCampaigns?.filter(
      (campaign) => totalPrice >= campaign.discount.minTotalBasketPrice
    );
    activeCampaigns.sort((a, b) => b.priority - a.priority);

    if (activeCampaigns.length > 0) {
      [activatedCampaigns, basket.products] = await campaignProductSortedHelper(
        activeCampaigns,
        products,
        userId
      );
    }

    const { totalDiscountedPrice } = products.reduce(
      (acc, product) => ({
        totalDiscountedPrice:
          acc.totalDiscountedPrice +
          (product.discountedPrice || product.price) * product.quantity,
      }),
      { totalDiscountedPrice: 0 }
    );

    basket.totalPrice = totalPrice;
    basket.totalDiscountedPrice = totalDiscountedPrice;
    basket.totalDiscountAmount = (totalPrice - totalDiscountedPrice).toFixed(2);

    if (coupon) {
      switch (coupon?.discount?.type) {
        case "flat":
          basket.totalDiscountedPrice -= coupon.discount.amount;
          basket.totalDiscountAmount += coupon.discount.amount;
          break;
        case "percentage":
          let discountPrice =
            (basket.totalDiscountedPrice * coupon.discount.amount) / 100;
          basket.totalDiscountedPrice -= discountPrice;
          basket.totalDiscountAmount += discountPrice;
          break;
        default:
          break;
      }
    }
    basket.appliedCampaigns = activatedCampaigns.filter(
      (campaign) => campaign.campaignApplied == true
    );
    return basket;
  } catch (error) {
    console.error("Error in applyBasketCampaign:", error);
    throw error;
  }
};

const campaignProductSortedHelper = async (
  activeCampaigns,
  products,
  userId
) => {
  try {
    for (let [i, campaign] of activeCampaigns.entries()) {
      let productArray = [];
      let brandIdList = campaign.brandIdList;
      let productIdList = campaign.productIdList;
      let categoryIdList = campaign.categoryIdList;

      for (let product of products) {
        if (
          product.appliedCampaign &&
          product.appliedCampaign._id.toString() !== campaign._id.toString()
        ) {
          continue;
        }
        let productId = product.productId.toString();
        let brandId = product.brandId;
        let categoryId = product.categoryId;

        const hasProductId = productIdList?.length > 0;
        const hasBrandId = brandIdList?.length > 0;
        const hasCategoryId = categoryIdList?.length > 0;

        const matchesProductId =
          !hasProductId || productIdList.includes(productId);
        const matchesBrandId = !hasBrandId || brandIdList.includes(brandId);
        const matchesCategoryId =
          !hasCategoryId || categoryIdList.includes(categoryId);

        if (matchesProductId && matchesBrandId && matchesCategoryId) {
          productArray.push(product);
        }
      }
      if (productArray.length > 0) {
        activeCampaigns[i] = await campaignPriceCalculatorHelper(
          campaign,
          productArray,
          userId
        );
      }
    }
    return [activeCampaigns, products];
  } catch (error) {
    console.error("Error in campaignProductSortedHelper:", error);
    throw error;
  }
};

const campaignPriceCalculatorHelper = async (
  campaign,
  productArray,
  userId
) => {
  try {
    productArray.sort((a, b) => a.price - b.price);
    let totalQuantity = 0;
    let totalPrice = 0;
    let discountAmount = 0;
    let discountedPrice = 0;
    for (let product of productArray) {
      totalQuantity += product.quantity;
      totalPrice += product.price * product.quantity;
    }
    if (
      campaign.discount.type === "MinXAmountToYPercentage" ||
      campaign.discount.type === "MinXAmountToYFlat"
    ) {
      discountAmount = await basketTotalPriceCampaignsHelper(
        totalPrice,
        campaign,
        userId
      );
    } else {
      discountAmount = await productQuantityCampaignsHelper(
        totalQuantity,
        campaign,
        userId,
        totalPrice
      );
    }
    discountedPrice = totalPrice - discountAmount;
    let discountPercentage = discountedPrice / totalPrice;
    for (let product of productArray) {
      product.discountedPrice = parseFloat(
        (product.price * discountPercentage).toFixed(2)
      );
      if (product.discountedPrice === 0) {
        product.discountedPrice = product.price;
      }
      product.discountSource = "campaign";
      product.appliedCampaign = campaign;
    }

    campaign.totalPrice = totalPrice;
    campaign.discountAmount = discountAmount;
    campaign.discountPercentage = discountPercentage;
    campaign.campaignApplied = true;
    return campaign;
  } catch (error) {
    console.error("Error in campaignPriceCalculatorHelper:", error);
    throw error;
  }
};

const productQuantityCampaignsHelper = async (
  totalQuantity,
  campaign,
  userId,
  totalPrice
) => {
  try {
    let discount = campaign.discount;
    let total = 0;
    let basketMaxAmount = 0;
    let discountAmount = 0;

    if (discount.type === "BuyXGetTotalPercentage") {
      discountAmount = (totalPrice * discount.amount) / 100;
      discountAmount =
        discountAmount < discount.maxDiscountAmount
          ? discountAmount
          : discount.maxDiscountAmount;
    } else {
      let usageAmount =
        parseInt(totalQuantity / discount.BuyX) < campaign.maxLimitInBasket
          ? parseInt(totalQuantity / discount.BuyX)
          : campaign.maxLimitInBasket;
      let availableForUser = 0;
      availableForUser = await checkAvailability(
        campaign._id,
        userId,
        usageAmount
      );
      basketMaxAmount = availableForUser;

      let freeProductAmount = discount.BuyX - discount.PayY;
      if (discount.type === "BuyXGetFlat") {
        discountAmount = discount.amount * basketMaxAmount;
      }
      if (discount.type === "BuyXPayY") {
        basketMaxAmount *= freeProductAmount;
        for (let product of productArray) {
          if (total + product.quantity <= basketMaxAmount) {
            discountAmount += product.price * product.quantity;
            total += product.quantity;
          } else {
            const remaining = basketMaxAmount - total;
            if (remaining > 0) {
              discountAmount += product.price * remaining;
              total += remaining;
            }
            break;
          }
        }
        if (discount.type === "BuyXGetPercentage") {
          discountAmount *= discount.amount / 100;
        }
      }
    }
    return discountAmount;
  } catch (error) {
    console.error("Error in productQuantityCampaignsHelper:", error);
    throw error;
  }
};
const basketTotalPriceCampaignsHelper = async (
  totalPrice,
  campaign,
  userId
) => {
  try {
    let discount = campaign.discount
    let discountAmount = 0;
    let usageAmount = 0;

    usageAmount =
      parseInt(totalPrice / discount.minTotalBasketPrice) <
      campaign.maxLimitInBasket
        ? parseInt(totalPrice / discount.minTotalBasketPrice)
        : campaign.maxLimitInBasket;
    let availableForUser = 0;
    availableForUser = await checkAvailability(
      campaign._id,
      userId,
      usageAmount
    );
    if (discount.type === "MinXAmountToYPercentage") {
      discountAmount = (totalPrice * discount.amount) / 100;
      discountAmount =
        discountAmount < discount.maxDiscountAmount
          ? discountAmount
          : discount.maxDiscountAmount;
    } else {
      discountAmount = availableForUser * discount.amount;
    }
    return discountAmount;
  } catch (error) {
    console.error("Error in basketTotalPriceCampaignsHelper:", error);
    throw error;
  }
};

const checkAvailability = async (campaignId, userId, usageAmount) => {
  try {
    let request = {};
    request.campaignId = campaignId;
    request.userId = userId;
    request.usageAmount = usageAmount;
    let response = await axios.post(
      `http://localhost:${process.env.USAGE_FOLLOWER_SERVICE_PORT}/api/usageFollower/check-availability`,
      request
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkAvailability:", error);
    throw error;
  }
};

module.exports = applyBasketCampaign;
