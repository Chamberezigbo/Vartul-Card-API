const express = require("express");
const {
	postForgotPassword,
	resetPassword,
} = require("../controllers/passwordcontroller");
const router = express.Router();
const {
	validateMiddleware,
	validateForgotPassword,
	validateResetPassword,
} = require("../middleware/validate");

router.post(
	"/forgot-password",
	validateForgotPassword,
	validateMiddleware,
	postForgotPassword
);
router.post(
	"/reset-password",
	validateResetPassword,
	validateMiddleware,
	resetPassword
);

module.exports = router;
