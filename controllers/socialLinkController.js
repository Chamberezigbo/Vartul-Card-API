const connection = require("../db");

const postSocialLink = async (req, res) => {
	const { userId } = req.user;
	const socialLink = req.body;
	console.log(userId);
	try {
		// check if email exists//
		const socialLinkExistQuery = await new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM social_links WHERE user_id=?",
				[userId],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
		if (socialLinkExistQuery.length > 0) {
			return res.status(201).json({
				message: "Social links exists",
				success: false,
			});
		}

		//! insert user into database//
		const query = await new Promise((resolve, reject) => {
			connection.query(
				"INSERT INTO social_links (`user_id`, `facebook`, `linkedIn`, `Instagram`) VALUES (?, ?, ?, ?)",
				[
					userId,
					socialLink.facebook,
					socialLink.linkedIn,
					socialLink.instagram,
				],
				(err, result) => {
					if (err) return reject(err);
					resolve(result);
				}
			);
		});
		console.log("Social links inserted");
		res.status(200).json({ success: true, message: socialLink });
	} catch (error) {
		console.log("Error inserting business:", error.message);
		res.status(500).json({ message: error.message, success: false });
	}
};

module.exports = { postSocialLink };
