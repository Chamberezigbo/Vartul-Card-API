const express = require("express");
const router = express.Router();
const authenticationToken = require("../middleware/authentication");
const { postSocialLink } = require("../controllers/socialLinkController");
const {
	validateSocialInput,
	validateMiddleware,
} = require("../middleware/validate");

router.post(
	"/",
	authenticationToken,
	validateSocialInput,
	validateMiddleware,
	postSocialLink
);

module.exports = router;
