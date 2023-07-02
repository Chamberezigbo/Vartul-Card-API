function generateRandomId() {
	const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
	let id = "";

	for (let i = 0; i < 25; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		id += characters[randomIndex];
	}

	return id;
}

module.exports = generateRandomId;
