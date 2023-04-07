const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const userValidator = require('../validators/userValidator');

//Create user
router.post('/user/add', userValidator.validateAddUser, userController.addUser);
//Get user by id
router.get('/user/read', userController.findUserById);
//Find users by firstname or lastname
router.get('/user/search', userController.findUsersByFirstOrLastName);
//Update a user by id
router.put('/user/edit/:id', userValidator.validateEditUser, userController.updateUserById);
//Remove a user by id
router.delete('/user/delete/:id', userController.removeUserById);
//Find n users have the coordinate nearest with the chosen userID coordinate (Not done yet)
router.get('/user/locate', userController.findUsersNear)

module.exports = router;