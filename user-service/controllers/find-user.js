const doFindUser = require('../business/user-find');

exports.findUser = async (req, res) => {
  let userId = req.user.userId;

  try {
    const user = await doFindUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
