const bcrypt = require("bcrypt");

const connection = require("../db");
const generateRandomId = require("../methods/randomId");
const generateToken = require("../methods/generateToken");
const hashPassword = require("../methods/hashingPassword");
const invalidatedTokens = []; // Array to store invalidated tokens

const postUser = async (req, res) => {
	let initUser = req.body;
	const user_id = generateRandomId();

	try {
		user = { ...initUser, user_id };

		// check if email exists//
		const emailExistQuery = await new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE email=?",
				[user.email],
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
			return res.status(201).json({
				message: "Email exists",
				success: false,
			});
		}

		// hash the password using salt//
		const hashedPassword = await hashPassword(user.password);
		// save the hashed password back to user object//
		user["password"] = hashedPassword;

		//! insert user into database//
		const query = await new Promise((resolve, reject) => {
			connection.query(
				"INSERT INTO users (`full_name`, `email`, `password`, `phone`, `date_of_birth`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)",
				[
					user.fullName,
					user.email,
					user.password,
					user.phone,
					user.dateOfBirth,
					user.user_id,
				],
				(err, result) => {
					if (err) return reject(err);
					resolve(result);
				}
			);
		});
		const token = generateToken(user.user_id);
		delete user.password;
		savedUser = { ...user, token };
		console.log("User inserted");
		res.status(200).json({ success: true, message: savedUser });
	} catch (err) {
		console.log("Error inserting user:", err.message);
		res.status(500).json({ message: err.message, success: false });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

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
			const dbPassword = emailExistQuery[0].password;
			const user_id = emailExistQuery[0].user_id;
			bcrypt.compare(password, dbPassword, (err, result) => {
				if (err) {
					res.status(500).json({ message: err.message });
				} else if (result) {
					const token = generateToken(user_id);
					res.status(200).json({
						success: true,
						message: "User successfully logged in",
						token,
					});
				} else {
					res.status(500).json({
						success: false,
						message: "Incorrect credentials",
					});
				}
			});
		}
	} catch (error) {
		console.log("Error login:", err.message);
		res.status(500).json({ message: err.message, success: false });
	}
};

const logoutUser = (req, res) => {
	// Clear the authentication token (JWT)
	res.clearCookie("token"); // Clear the token from cookies

	// Invalidate the token server-side (optional)
	// Assuming you have the token stored in a variable
	const token = req.headers.authorization.split(" ")[1];
	invalidatedTokens.push(token); // Add the token to the blacklist

	// Clear session-related data (if applicable)
	req.session.destroy(); // Clear the session data

	// Optionally regenerate CSRF token (if CSRF protection is implemented)

	res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
	postUser,
	loginUser,
	logoutUser,
	invalidatedTokens,
};
