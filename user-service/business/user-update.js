const { sendMessageToKafka } = require("../kafka");
const User = require("../models/user");

const doUpdateUser = async (userId, updatedUser, options) => {
  const oldUser = await User.findById(userId);

  if (oldUser && JSON.stringify(oldUser) === JSON.stringify(updatedUser)) {
    throw new Error("New user data is the same as the old data.");
  }

  const user = await User.findByIdAndUpdate(userId, updatedUser, options);
  await user.save()
  await sendMessageToKafka('UserService_userUpdated', user);
  return user;
};

module.exports = doUpdateUser;
