const User = require("../models/user");
const bcrypt = require('bcrypt');

const doLoginUser = async (email) => {
  const loggedUser = await User.findOne({ email });
  return loggedUser;
};

const validPass = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

module.exports = { doLoginUser, validPass };
