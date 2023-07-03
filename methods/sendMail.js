// forgotPassword.js

const nodemailer = require("nodemailer");
// Create the transporter
const transporter = nodemailer.createTransport({
	host: "mail.defiprosolutions.com",
	port: 465,
	secure: true, // upgrade later with STARTTLS
	auth: {
		user: "info@defiprosolutions.com",
		pass: "N,JT8,~{@XGS",
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
