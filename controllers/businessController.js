connection = require("../db");

const postBusinessData = async (req, res) => {
	const initBusinessData = req.body;
	const user_id = req.user.userId;
	const businessData = { ...initBusinessData, user_id };

	try {
		// check if email exists//
		const businessDataExistQuery = await new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM business_details WHERE user_id=?",
				[businessData.user_id],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
		if (businessDataExistQuery.length > 0) {
			return res.status(201).json({
				message: "business exists",
				success: false,
			});
		}

		//! insert user into database//
		const query = await new Promise((resolve, reject) => {
			connection.query(
				"INSERT INTO business_details (`user_id`, `name`, `description`, `logo`, `location`) VALUES (?, ?, ?, ?, ?)",
				[
					businessData.user_id,
					businessData.name,
					businessData.description,
					businessData.logo,
					businessData.location,
				],
				(err, result) => {
					if (err) return reject(err);
					resolve(result);
				}
			);
		});
		console.log("Business inserted");
		res.status(200).json({ success: true, message: businessData });
	} catch (error) {
		console.log("Error inserting business:", error.message);
		res.status(500).json({ message: error.message, success: false });
	}
};

module.exports = { postBusinessData };
