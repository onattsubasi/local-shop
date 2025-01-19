const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization ?? req.query.accessToken) {
    token = req.headers.authorization ?? req.query.accessToken;
    token = token.split(" ")[1];
  }

  try {
    if (!token) {
      throw new Error("Token not provided");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SEC);

    req.user = decoded;
    userId = req.user.userId;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    let errorCode;
    let errorMessage;

    if (err.name === "JsonWebTokenError") {
      errorCode = 401;
      errorMessage = "Invalid token provided.";
    } else if (err.name === "TokenExpiredError") {
      errorCode = 401;
      errorMessage = "Token has expired.";
    } else {
      errorCode = 500;
      errorMessage = "Internal server error occurred.";
    }

    res.status(errorCode).json({ error: errorMessage });
  }
};

module.exports = verifyToken;
