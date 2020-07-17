const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false})); // gives access to req.body

// first test endpoint:
app.get("/", (req, res) =>
	res.json({
		message: "Welcome to the Contact Keeper API brought to you by Christopher Soltis"
	})
);

// Define Route(s) and location of the routes file:
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

/*
Note:
In Routes, I am establishing the base route along with the extension to be added to reach specific points

*/
