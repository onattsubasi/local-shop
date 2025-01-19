const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.clearCookie("token");

        if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ error: "Invalid token provided." });
        } else if (err.name === "TokenExpiredError") {
          return res.status(403).json({ error: "Token has expired." });
        } else {
          return res.status(500).json({ error: "Internal server error." });
        }
      }
      req.user = user;
      req.token = token;
      next();
    });
  } else {
    return res.status(401).json({ error: "You don't have permission." });
  }
};
module.exports = verifyToken