const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const generateToken = (userId) => {
	payLoad = {
		userId,
	};

	const options = {
		expiresIn: "1h", // Token expiration time
	};
	const token = jwt.sign(payLoad, secretKey, options);
	return token;
};

module.exports = generateToken;
