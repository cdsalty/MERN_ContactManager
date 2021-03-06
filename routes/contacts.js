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

// @description:  UPDATE contact
// @route url:    PUT api/contacts/:id (remember to use the ":id" from the route to update )
// @access perm:  ** Private **
router.put("/:id", auth, async (req, res) => {
	// Pull out the data from the request
	const {name, email, phone, type} = req.body;
	// Build contact object (based of the fields submitted from above)
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id); // findById will search the ":id" in the url
		if (!contact) return res.status(404).json({message: "No contact found to update"});

		// Security Step: Make sure user owns contact. (prevent someone from changing a contact's info using curl, postman or another tool on the backend)
		if (contact.user.toString() !== req.user.id) {
			// toString allows the comparision to correctly compare. if not, they would be two different types and would never match
			return res
				.status(401)
				.json({message: "Not Authorized to make changes to a user's contact"});
		}

		// find and update the contact
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{$set: contactFields}, // mongo to set the new contact to the data from contactFields
			{new: true}
		); // if the contact isn't there, then create new contact
		res.json(contact); // return the updated/new contact information
	} catch (error) {
		console.error(`error message from getting contacts is ${error.message}`);
		res.status(500).send("Server Error");
	}
});

// ------			------			------			------			------			------			------			------			------			------

// @description:  Delete contact
// @route url:    DELETE api/contacts/:id	=> http://localhost:5000/api/contacts/5f16707097058b106ccbcadf
// @access perm:  Private **
router.delete("/:id", auth, async (req, res) => {
	try {
		// Start off by getting the contact from the user's contacts
		let contact = await Contact.findById(req.params.id); // findById will search the ":id" in the url
		if (!contact) return res.status(404).json({message: "No contact found to update"});

		// Security Step: Make sure user owns contact. (prevent someone from changing a contact's info using curl, postman or another tool on the backend)
		if (contact.user.toString() !== req.user.id) {
			// toString allows the comparision to correctly compare. if not, they would be two different types and would never match
			return res
				.status(401)
				.json({message: "Not Authorized to make changes to a user's contact"});
		}

		// DELETE contact (does not need a variable; be sure to use Remove() because delete() is depricated)
		await Contact.findByIdAndRemove(req.params.id);
		res.json({message: "Contact has been successfully removed"}); // return the updated/new contact information
	} catch (error) {
		console.error(`error message from getting contacts is ${error.message}`);
		res.status(500).send("Server Error");
	}
	// TO TEST:
	// - inside of postman, add a contact's user id to the url and inside headers, x-auth-token and set the value to the user's token
});

// ------			------			------			------			------			------			------			------			------			------

module.exports = router;
