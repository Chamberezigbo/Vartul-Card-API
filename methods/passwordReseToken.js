const { v4: uuidv4 } = require("uuid");

function generateResetToken() {
	const resetToken = uuidv4(); // Generate a unique UUID

	// Create a timestamp for the current time and add 30 minutes to it
	const expirationTime = new Date();
	expirationTime.setMinutes(expirationTime.getMinutes() + 30);

	// Save the reset token and its expiration time in your database (e.g., using a User model or a dedicated ResetToken model)
	// ...

	return { resetToken, expirationTime };
}

module.exports = generateResetToken;
