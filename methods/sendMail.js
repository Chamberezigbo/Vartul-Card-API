// forgotPassword.js

const nodemailer = require("nodemailer");
// Create the transporter
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.envEMAIL_PORT,
	secure: true, // upgrade later with STARTTLS
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

function sendMail(email, inputText, callback) {
	// Compose the email message
	const mailOptions = {
		from: "your-email@example.com",
		to: email,
		subject: "Password Reset",
		text: inputText,
	};

	// Send the email using Nodemailer or your preferred email sending library
	transporter.sendMail(mailOptions, callback);
}

module.exports = sendMail;
