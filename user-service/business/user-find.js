const User = require('../models/user');


const doFindUser = async (userId) => {
    try {
        const user = User.findById(userId)
        return user
    } catch(err) {console.log('Cannot find user');
    }
}

module.exports = doFindUser;