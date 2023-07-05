const express = require("express");
const router = express.Router();

const businessController = require("../controllers/businessController");
const authenticationToken = require("../middleware/authentication");
const {
	validateBusinessInput,
	validateMiddleware,
} = require("../middleware/validate");

router.post(
	"/",
	authenticationToken,
	validateBusinessInput,
	validateMiddleware,
	businessController.postBusinessData
);

module.exports = router;
