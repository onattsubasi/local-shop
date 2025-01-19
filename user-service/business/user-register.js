const User= require('../models/user');
const { sendMessageToKafka } = require('../kafka');


const doRegisterUser = async (userCreate) => {
    const regUser = await new User(userCreate);
    await regUser.save();
    await sendMessageToKafka('UserService_userCreated', regUser);
    return regUser
};

module.exports = doRegisterUser;

/*
"username":"iman",
"password":"12345",
"email":"test@gmail.com",
"address":"istanbul"
*/