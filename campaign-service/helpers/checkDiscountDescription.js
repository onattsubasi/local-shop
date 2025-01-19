const doCheckDiscountDescription = async (campaign) => {
  try {
    let discountDescriptions = new Map();
    discountDescriptions.set(
      "flat",
      "Ürün kampanyasıdır. Düz fiyat indirimi sağlar. Girilen tutar, ürünün fiyatından düşer. Sepet kampanyaları ile birleştirilemez!"
    );
    discountDescriptions.set(
      "percentage",
      "Ürün kampanyasıdır. Yüzdelik fiyat indirimi sağlar. Girilen sayı, ürünün fiyatını yüzdelik olarak düşür. Sepet kampanyaları ile birleştirilemez!"
    );
    discountDescriptions.set(
      "BuyXPayY",
      "Sepet kampanyasıdır. X öde Y al şeklindedir. İlk sayı alınması gereken ürün miktarı, ikincisi ödenecek ürün miktarını belirler. Yapılan indirim, en düşük fiyatlı ürün üzerinden uygulanır."
    );
    discountDescriptions.set(
      "BuyXGetTotalPercentage",
      "Sepet kampanyasıdır. X. üründe %Y indirim şeklinde düşünülebilir. İlk sayı alınması gereken ürün miktarını, ikinci sayı yüzdesel indirimi belirler. Yapılan yüzdelik indirim total sepet tutarınadır."
    );
    discountDescriptions.set(
      "BuyXGetPercentage",
      "Sepet kampanyasıdır. X. üründe %Y indirim şeklinde düşünülebilir. İlk sayı alınması gereken ürün miktarını, ikinci sayı yüzdesel indirimi belirler. Yapılan yüzdelik indirim, en düşük fiyatlı ürüne uygulanır"
    );
    discountDescriptions.set(
      "BuyXGetFlat",
      "Sepet kampanyasıdır. X. üründe düz fiyat indirimi şeklinde düşünülebilir. İlk sayı alınması gereken ürün miktarını, ikinci sayı yüzdesel indirimi belirler."
    );
    discountDescriptions.set(
      "MinXAmountToYPercentage",
      "Sepet kampanyasıdır. Belirlenen minimum sepet tutarının aşılması ile sepete girilen yüzdelik(%'lik) fiyat indirimi uygulanır."
    );
    discountDescriptions.set(
      "MinXAmountToYFlat",
      "Sepet kampanyasıdır. Belirlenen minimum sepet tutarının aşılması ile sepete girilen düz fiyat indirimi uygulanır."
    );
    discountDescriptions.set(
      "SpecificProducts",
      "Sepet kampanyasıdır. Belirlenen ürünlerin alınması ile belirli bir indirim sağlanır. Buna başka bir ürünü indirimli almak da dahil"
    );
    //discountDescriptions.set("userType","Ürünü satın alacak kullanıcının üyelik tipine bağlı indirim sağlar.");

    let type = campaign.discount.type;
    let description = discountDescriptions.get(type);
    return description;
  } catch (error) {
    console.log(error);
  }
};
module.exports = doCheckDiscountDescription;
