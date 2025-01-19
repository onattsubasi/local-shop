const doUpdateUser = require("../business/user-update");

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await doUpdateUser(
      req.user.userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
