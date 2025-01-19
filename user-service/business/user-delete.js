const { sendMessageToKafka } = require('../kafka');
const User = require('../models/user');

const doDeleteUser = async (delUser) => {
    const deleteUser = await User.findByIdAndDelete(delUser);
   await sendMessageToKafka('UserService_userDeleted', deleteUser);
   return deleteUser
};

module.exports= doDeleteUser;