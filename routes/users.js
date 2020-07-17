// REGISTRATION:
const express = require("express");
const router = express.Router();
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
	(req, res) => {
		// res.send(req.body); // returned the user data
		const errors = validationResult(req); // brought in at the top; next check if it's empty
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array() // will return an array of all errors
			});
		}

		res.send("PASSED WITH FLYING COLORS");
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
