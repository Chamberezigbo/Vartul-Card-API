const express = require("express");
const router = express.Router();

const userController = require("../controllers/usercontroller");
const authentication = require("../middleware/authentication");
// middleware for validating user inputs//
const {
	validateMiddleware,
	validateUserInput,
} = require("../middleware/validateUser");

const validateLoginCredentials = require("../middleware/validateLoginCredential");

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
	validateLoginCredentials.validateUserInput,
	validateLoginCredentials.validateMiddleware,
	userController.loginUser
);

router.delete("/logout", authentication, userController.logoutUser);

module.exports = router;
