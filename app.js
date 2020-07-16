const express = require("express");
const app = express();

// first endpoint:
app.get("/", (req, res) =>
	res.json({
		message: "Welcome to the Contact Keeper API brought to you by Christopher Soltis"
	})
);

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

/*
Note:
In Routes, I am establishing the base route along with the extension to be added to reach specific points

*/
