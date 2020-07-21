// To serve as primary crud route (GET, POST, PUT, DELETE)

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator"); // https://express-validator.github.io/docs/ (terminal states '/check' is deprecated)

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route url:    GET api/contacts	(http://localhost:5000/api/contacts)
// @description:  Get all user's contacts (not all contacts in database)
// @access perm:  Private (will need to bring in auth middleware for protected routes like this)
router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({user: req.user.id}).sort({date: -1}); // -1 will sort by most recent
		// return the contacts from above:
		res.json(contacts);
	} catch (error) {
		console.error(`error message from getting contacts is ${error.message}`);
		res.status(500).send("Server Error");
	}
});

// ------			------			------			------			------			------			------			------			------			------

// @route url:    POST api/contacts (http://localhost:5000/api/contacts)
// @description:  Add a New Contact (need: name, email, phone, type and user)
// @access perm:  Private **
router.post(
	"/",
	// brackets allow use of mulitple middleware functions
	[
		auth,
		[
			// check if name is empty (name is the only required field)
			check("name", "Name is required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Start with error checking
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// if errors are not empty
			return res.status(400).json({
				errors: errors.array() // returns array of all errors
			});
		}
		// pull out the data from/in the body
		const {name, email, phone, type} = req.body;

		try {
			// Create a New contact and pass in an object with the field data
			const newContact = new Contact({
				name,
				email,
				phone,
				type, // personal or professional
				user: req.user.id // is taken from req.user of the auth middleware
			});

			// store newContact in a variable to save to the database using .save()
			const contact = await newContact.save(); // newContact is the contact instance

			res.json(contact);
		} catch (error) {
			console.error(`Creating New Contact Error Message: ${error.message}`);
		}
	}
);

// ------			------			------			------			------			------			------			------			------			------

// @route url:    PUT api/contacts/:id (if you are going to update a contact, you need to be able to update a SPECIFIC(:id) contact)
// @description:  Update contact
// @access perm:  Private **
router.put("/:id", (req, res) => {
	// remember to update route with ":id"
	res.send("Update a contact");
});

// ------			------			------			------			------			------			------			------			------			------

// @route url:    DELETE api/contacts/:id
// @description:  Delete contact
// @access perm:  Private **
router.delete("/:id", (req, res) => {
	res.send("Delete a contact");
});

// ------			------			------			------			------			------			------			------			------			------

module.exports = router;
