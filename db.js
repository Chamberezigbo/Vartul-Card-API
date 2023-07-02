const mysql = require("mysql");

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL:", err);
		return;
	}
	console.log("Connected to MySQL!");
	// Perform database operations here
});

// Close the connection when you're done
// connection.end();

module.exports = connection;
