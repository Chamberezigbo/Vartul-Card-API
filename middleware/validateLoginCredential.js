const { body, validationResult } = require("express-validator");

//validate middleware//

const validateUserInput = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address."),
	body("password").notEmpty().withMessage("Password is required."),
];
const validateMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res
			.status(400)
			.json({ sucess: false, errors: errorMessages.join(", ") });
	}
	next();
};

module.exports = { validateMiddleware, validateUserInput };
