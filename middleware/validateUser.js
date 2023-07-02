const { body, validationResult } = require("express-validator");

//validate middleware//

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
const validateMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res.status(400).json({ errors: errorMessages.join(", ") });
	}
	next();
};

module.exports = { validateMiddleware, validateUserInput };
