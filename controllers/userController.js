const bcrypt = require("bcrypt");

const connection = require("../db");
const generateRandomId = require("../methods/randomId");
const generateToken = require("../methods/generateToken");

const postUser = async (req, res) => {
	let initUser = req.body;
	const user_id = generateRandomId();

	try {
		user = { ...initUser, user_id };
		//generate unqiue salting
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);

		// hash the password using salt//
		const hashPassword = await bcrypt.hash(user.password, salt);
		// save the hashed password back to user object//
		user["password"] = hashPassword;

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
		savedUser = { ...user, token };
		console.log("User inserted");
		res.status(200).json({ success: true, message: savedUser });
	} catch (err) {
		console.log("Error inserting user:", err.message);
		res.status(500).json({ message: err.message, success: false });
	}
};

module.exports = {
	postUser,
};
