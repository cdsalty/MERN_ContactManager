const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator"); // https://express-validator.github.io/docs/ (notes said not to use '/check')

const User = require("../models/User");

// @route request:  GET api/auth
// @purpose:        To get logged in user
// @access perm:    PRIVATE
// router.get("/", (req, res) => { ---> without middleware verification
router.get("/", auth, async (req, res) => {
	// ----> with 'auth' middleware verification
	// res.send("Get Logged In User");
	// Now, I am actually getting logged in user...
	try {
		// the req holds the onject data, including the user's id. (REMEMBER, in auth middleware, I ASSIGNED THE PAYLOAD TO REQ.USER from the decoded user) ******
		const user = await User.findById(req.user.id).select("-password"); // don't include the password even though it's encrypted; not needed
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
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
		// Destructure email and password
		const {email, password} = req.body;

		try {
			// create a variable to hold the user from the email entered
			let user = await User.findOne({email: email}); // find and verify by email  --> determine if email and password exist
			if (!user) {
				return res.status(400).json({message: "Invalid Credentials"});
			}
			// if THERE IS a user: continue and check password (BCRYPT COMPARE METHOD, returns true or false)
			// "compare" looks at the password coming from the body, against the hashed password in database
			const isMatch = await bcrypt.compare(password, user.password);
			// IF Password doesn't match, STOP HERE
			if (!isMatch) {
				return res.status(400).json({message: "Invalid Credentials"});
			}
			// if everything matches up, create payload to pass into jwt.sign (same setup as in users.js)
			const payload = {
				user: {
					id: user.id // the user.id returns the info for the contacts
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000 // 3600 is one hour; need to change back when production ready
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
