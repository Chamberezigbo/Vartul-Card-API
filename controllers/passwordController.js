const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const hashPassword = require("../methods/hashingPassword");
const sendMail = require("../methods/sendMail");
const generateResetToken = require("../methods/passwordReseToken");

const postForgotPassword = async (req, res) => {
	const { email } = req.body;
	// generate a unique password reset token //
	const { resetToken, expirationTime } = generateResetToken();

	try {
		// check if email exists//
		const emailExistQuery = await new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE email=?",
				[email],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
		if (emailExistQuery.length > 0) {
			// checking if token stored with email exists
			const UserTokenExist = await new Promise((resolve, reject) => {
				connection.query(
					"SELECT * FROM reset_password WHERE email=?",
					[email],
					(err, result) => {
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			});
			// update the database with new token//
			if (UserTokenExist.length > 0) {
				// Save the reset token and its expiration date in your database (e.g., using a User model or a dedicated ResetToken model)
				const query = await new Promise((resolve, reject) => {
					connection.query(
						"UPDATE reset_password SET `token` = ?, `expiration_time` = ? WHERE `email` = ?",
						[resetToken, expirationTime, email],
						(err, result) => {
							if (err) return reject(err);
							resolve(result);
						}
					);
				});
				const text = `Click the following link to reset your password: ${resetToken}`;
				// Compose the email message
				sendMail(email, text, (error, info) => {
					if (error) {
						console.log(
							"Error sending password reset email:",
							error
						);
						return res.status(500).json({
							message:
								"An error occurred while sending the password reset email.",
						});
					}
					console.log("Password reset email sent:", info.response);
					res.status(200).json({
						message: "Password reset email sent successfully.",
					});
				});
			} else {
				// Save the reset token and its expiration date in your database (e.g., using a User model or a dedicated ResetToken model)
				const query = await new Promise((resolve, reject) => {
					connection.query(
						"INSERT INTO reset_password ( `email`, `token`,`expiration_time`) VALUES (?, ?,?)",
						[email, resetToken, expirationTime],
						(err, result) => {
							if (err) return reject(err);
							resolve(result);
						}
					);
				});
				// Compose the email message
				const text = `Click the following link to reset your password: ${resetToken}`;
				// Compose the email message
				sendMail(email, text, (error, info) => {
					if (error) {
						console.log(
							"Error sending password reset email:",
							error
						);
						return res.status(500).json({
							success: false,
							message:
								"An error occurred while sending the password reset email.",
						});
					}
					console.log("Password reset email sent:", info.response);
					res.status(200).json({
						success: true,
						message: "Password reset email sent successfully.",
					});
				});
			}
		} else {
			res.status(400).json({
				success: false,
				message: "Bad request.",
			});
		}
	} catch (error) {
		console.log("Error inserting user:", error.message);
		res.status(500).json({ message: error.message, success: false });
	}
};

const resetPassword = async (req, res) => {
	const { resetToken, newPassword } = req.body;

	// check if email exists//
	const tokenExistQuery = await new Promise((resolve, reject) => {
		connection.query(
			"SELECT * FROM reset_password WHERE token=?",
			[resetToken],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
	if (tokenExistQuery.length == 0) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid reset token." });
	}
	if (tokenExistQuery[0].expiration_time < new Date()) {
		return res
			.status(400)
			.json({ success: false, message: "Reset token has expired." });
	}
	const hashedPassword = await hashPassword(newPassword);
};

module.exports = { postForgotPassword };
