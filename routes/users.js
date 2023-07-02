const express = require("express");
const router = express.Router();

const userController = require("../controllers/usercontroller");
// middleware for validating user inputs//
const {
	validateMiddleware,
	validateUserInput,
} = require("../middleware/validateUser");

// Define routes for users
router.post(
	"/",
	validateUserInput,
	validateMiddleware,
	userController.postUser
);

module.exports = router;
