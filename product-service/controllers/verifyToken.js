const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    userId = req.user.userId;
    next();
  } else {
    return res.status(401).json("You don't have permission.");
  }
};

module.exports =verifyToken;


