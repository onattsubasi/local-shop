const checkUserType = async (user) => {
  try {
    const email = user.email;
    if (email.includes(".edu")) {
      user.userType.push("academic");
    }
  } catch (error) {
    console.error("Error happened in checkUserType: ", error);
    throw error;
  }
};
module.exports = checkUserType;
