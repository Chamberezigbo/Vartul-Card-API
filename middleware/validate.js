const { body, validationResult, check } = require("express-validator");

//validate middleware//
// validate signup credentials
const validateUserInput = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address."),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long.")
		.matches(/\d/)
		.withMessage("Password must contain at least one digit."),
	body("fullName").notEmpty().trim().withMessage("Full name is required"),
	body("phone")
		.isMobilePhone()
		.withMessage("Please provide a valid phone number."),
	body("dateOfBirth")
		.isDate()
		.withMessage("Please provide a valid date of birth."),
];
// validate business rules//
// const validateBusinessInput = [
// 	check("description")
// 		.isLength({ max: 200 })
// 		.withMessage("description must not be more than 200 words")
// 		.notEmpty()
// 		.withMessage("description of your business must be provided."),
// 	check("name").notEmpty().trim().withMessage("name is required"),
// 	check("location").notEmpty().withMessage("Please provide a location."),
// ];

//validate login user input//
const validateUserLogin = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address."),
	body("password").notEmpty().withMessage("Password is required."),
];

// for forgotten password validation//
const validateForgotPassword = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address."),
];

// for reset password validation//
const validateResetPassword = [
	body("resetToken").notEmpty().withMessage("Please provide a token."),
	body("newPassword")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long.")
		.matches(/\d/)
		.withMessage("Password must contain at least one digit."),
];

const validateSocialInput = [
	body("facebook").trim().optional(), // Make the email field optional
	body("linkedIn").trim().optional(),
	body("Instagram").trim().optional(),
];

const validateMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res
			.status(400)
			.json({ success: false, errors: errorMessages.join(", ") });
	}
	next();
};

module.exports = {
	validateMiddleware,
	validateUserInput,
	// validateBusinessInput,
	validateUserLogin,
	validateForgotPassword,
	validateResetPassword,
	validateSocialInput,
};
