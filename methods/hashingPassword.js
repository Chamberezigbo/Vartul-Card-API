const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
	try {
		//generate unique salting
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);

		// hash the password using salt//
		const hashedPassword = await bcrypt.hash(password, salt);
		// save the hashed password back to user object//
		return hashedPassword;
	} catch (error) {
		console.error("Error hashing password:", error);
		throw new Error("An error occurred while hashing the password.");
	}
};

module.exports = hashPassword;
