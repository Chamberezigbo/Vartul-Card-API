const express = require("express");
const router = express.Router();

const businessController = require("../controllers/businessController");
const authenticationToken = require("../middleware/authentication");
const {
	validateUserInput,
	validateMiddleware,
} = require("../middleware/validateBusiness");

router.post(
	"/",
	authenticationToken,
	validateUserInput,
	validateMiddleware,
	businessController.postBusinessData
);

module.exports = router;
