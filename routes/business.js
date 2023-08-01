const express = require("express");
const router = express.Router();

const { upload } = require("../methods/imagekitStorage");
const businessController = require("../controllers/businessController");
const authenticationToken = require("../middleware/authentication");
// const {
// 	validateBusinessInput,
// 	validateMiddleware,
// } = require("../middleware/validate");

router.post(
	"/",
	authenticationToken,
	// validateBusinessInput,
	// validateMiddleware,
	upload.single("image"),
	businessController.postBusinessData
);

module.exports = router;
