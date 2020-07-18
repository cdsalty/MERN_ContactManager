const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const {check, validationResult} = require("express-validator"); // https://express-validator.github.io/docs/ (notes said not to use '/check')

const User = require("../models/User");

// @route request:  GET api/auth
// @purpose:        To get logged in user
// @access perm:    PRIVATE
router.get("/", (req, res) => {
	res.send("Get Logged In User");
});

// @route request:  POST api/auth (post method because it needs to send out & authenticate the data)
// @purpose:        Autorize user & get token
// @access perm:    PUBLIC
router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password Incorrect").exists()
	],
	async (req, res) => {
		const errors = validationResult(req); // brought in at the top; next check if it's empty
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array() // will return an array of all errors
			});
		}
		// Destructure email and password because that is all that's being entered when logging in
		const {email, password} = req.body;

		try {
			let user = await User.findOne({email: email}); // find and check by email
			// verify email and password exist with try/catch; be sure to use same error message!
			if (!user) {
				return res.status(400).json({message: "Invalid Credentials"});
			}
			// if THERE IS a user: continue and check password (USING BCRYPT COMPARE METHOD; returns true or false)
			// "compare" takes in the password for the user coming from body against the hashed password in database
			const isMatch = await bcrypt.compare(password, user.password); // password compared to the user's password in the database

			// check isMatch
			if (!isMatch) {
				return res.status(400).json({message: "Invalid Credentials"});
			}

			// if everythings continues to match, continue to token (copied/pasted from user.js
			const payload = {
				user: {
					id: user.id // the user.id gives all the information needed for a contact
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000 // 3600 is one hour and will be changed back for production
				},
				(err, token) => {
					if (err) throw err;
					res.json({token});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
