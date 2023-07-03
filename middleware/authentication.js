const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { invalidatedTokens } = require("../controllers/usercontroller");

const authenticationToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header
		// Check if the token is in the blacklist
		if (invalidatedTokens.includes(token)) {
			return res.status(401).json({ message: "Invalid token" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			err
				? res.status(401).json({ message: "Invalid token" })
				: ((req.user = decoded), next());
		});
	} else {
		res.status(401).json({ message: "No token provided" });
	}
};

module.exports = authenticationToken;
