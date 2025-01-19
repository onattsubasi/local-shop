const User = require("../models/user");
const bcrypt = require("bcrypt");
const doRegisterUser = require("../business/user-register");

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    const existingUser = await User.findOne({ $or: [{ username: newUser.username }, { email: newUser.email }] });

    if (existingUser) {
      return res.status(400).json({ error: "Bu kullanıcı adı veya e-posta adresi zaten kullanımda." });
    }

    try {
      const resMsg = await doRegisterUser(newUser);
      res.status(200).json(resMsg);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Kullanıcı kaydedilirken bir hata oluştu." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." });
  }
};

/*
  {
    "username":"eman" ,
    "password":"123456",
    "email":"eassi420@gmail.com",
    "address":"istanbul"
  }
  */