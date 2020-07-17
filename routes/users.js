// REGISTRATION:
const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const {check, validationResult} = require("express-validator/check"); // https://express-validator.github.io/docs/

const User = require("../models/User");

// @route url:    POST api/users
// @description:  Register a user
// @access perm:  Public
router.post(
	"/",
	// Start by 'setting the checks'
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password must include 6 or more characters").isLength({min: 6})
	],
	async (req, res) => {
		// res.send(req.body); // returned the user data
		const errors = validationResult(req); // brought in at the top; next check if it's empty
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array() // will return an array of all errors
			});
		}
		// destructure req.body
		const {name, email, password} = req.body;
		// check if user exist against their password
		try {
			let user = await User.findOne({email: email}); // search user via email address
			if (user) {
				return res.status(400).json({msg: "User already exist"});
			}
			// if user does exist: take the user variable initialzied above and createn a new user with the same properties
			user = new User({
				name: name,
				email: email,
				password: password
			});
			// this has only created the new user; * need to encrypt/hash the password
			const salt = await bcrypt.genSalt(10); // 10 determines how secure the salt is... 10 is default
			user.password = await bcrypt.hash(password, salt); // this will create a hashed password that will then be assigned to the user object.
			await user.save(); // (a)wait until everything has completed and THEN save the new user
			// will need to also send back a json web token
			res.send("Creating/Saving User functionality successful");
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;

/*

- to use req.body, must add middleware inside app.js

- check('name', 'name is required')
  - the field to check and the message to display; THEN, add rules ".not()..."
  - .not() is paired with .isEmpty() to check if it's not empty

only create "errors" variable, after the req,res, for routes that will accept data and need vaildation
- the email, name and password are all requried and needed after using the express-validator
*/
