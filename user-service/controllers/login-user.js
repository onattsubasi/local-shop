const jwt = require("jsonwebtoken");
const { doLoginUser, validPass } = require("../business/user-login");
const cookie = require("cookie");

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    try {
      const user = await doLoginUser(email);
      if (!user) {
        return res.status(401).json("User not found!");
      }

      const isValidPassword = await validPass(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json("Wrong Password.");
      }

      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        process.env.JWT_SEC,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        
        httpOnly: false,
        sameSite: "None",
        maxAge: 50 * 600 * 10000,
      });

      const { password: _, address, ...userData } = user._doc;
      res
        .status(200)
        .json({ success: true, message: "Login successful", user: userData });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/*
{
"password":"123456",
"email":"eassi420@gmail.com"
}
*/
