const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");
const authentication = require("../middleware/authentication");
// middleware for validating user inputs//
const {
	validateMiddleware,
	validateUserInput,
	validateUserLogin,
} = require("../middleware/validate");

// Define routes for users
router.post(
	"/",
	validateUserInput,
	validateMiddleware,
	userController.postUser
);

// routes for login//
router.post(
	"/login",
	validateUserLogin,
	validateMiddleware,
	userController.loginUser
);

router.delete("/logout", authentication, userController.logoutUser);

module.exports = router;
