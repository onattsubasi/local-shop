const mongoose = require("mongoose");

const doCheckMongoose = (list) => {
  if (list) {
    for (const id of list) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid ID: ${id}`);
      }
    }
  }
};

module.exports = doCheckMongoose;
