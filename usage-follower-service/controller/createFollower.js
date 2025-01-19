const doCreateFollower = require("../business/createFollower");
exports.createFollower = async (req, res, next) => {
  try {
    let tempObj = req.body;
    const resMsg = await doCreateFollower(tempObj);
    res.status(201).send(resMsg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
