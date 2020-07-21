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
		console.error(`error message from getting contacts is ${err.message}`);
		res.status(500).send("Server Error");
	}
});

// ------			------			------			------			------			------			------			------			------			------

// @route url:    POST api/contacts (http://localhost:5000/api/contacts)
// @description:  Add a New Contact
// @access perm:  Private **
router.post(
	"/",
	[
		auth,
		[
			// check to make sure name is not left empty
			check("name", "Name is required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Start with error checking
		const errors = validationResult(req); // brought in at the top; next check if it's empty
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array() // will return an array of all errors
			});
		}
		// pull out the data in the body
		const {name, email, phone, type} = req.body;

		try {
			// Create the data/layout for a New contact:
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id
			});
			// create the contact and save
			const contact = await newContact.save();

			res.json(contact);
		} catch (error) {}
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
