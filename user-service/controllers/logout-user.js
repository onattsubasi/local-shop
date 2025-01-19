exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").send("Logged out.");
  } catch (err) {
    console.error("Error clearing cookie:", err);
    res.status(500).json({ error: "Internal server error occurred." });
  }
};
