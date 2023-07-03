const { body, validationResult } = require("express-validator");

//validate middleware//

const validateUserInput = [
	body("logo").trim().optional(), // Make the email field optional
	body("description")
		.isLength({ max: 200 })
		.withMessage("description must not be more than 200 words")
		.notEmpty()
		.withMessage("Password must contain at least one digit."),
	body("name").notEmpty().trim().withMessage("name is required"),
	body("location")
		.notEmpty()
		.withMessage("Please provide a valid phone number."),
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

module.exports = { validateMiddleware, validateUserInput };
