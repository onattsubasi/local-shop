const express = require('express');

const registerUser = require('../controllers/register-user');

const loginUser = require('../controllers/login-user');

const updatedUser = require('../controllers/update-user');

const findUser = require('../controllers/find-user');

const deleteUser = require('../controllers/delete-user');

const logoutUser = require('../controllers/logout-user');

const {verifyToken} = require('../controllers/verifyToken');

const router = express();

router.post('/signup', registerUser.registerUser);

router.post('/signin', loginUser.loginUser);

router.get('/logout', verifyToken,logoutUser.logoutUser);

router.patch('/update', verifyToken,updatedUser.updateUser);

router.get('/find', verifyToken, findUser.findUser);

router.delete('/delete', verifyToken,deleteUser.deleteUser);

module.exports = router;