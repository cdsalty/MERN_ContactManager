// will serve as primary crud route(GET, POST, PUT, DELETE)
const express = require("express");
const router = express.Router();

// @route url:    GET api/contacts
// @description:  Get all user's contacts (not all contacts in database)
// @access perm:  Private
router.get("/", (req, res) => {
	res.send("Get all contacts");
});

// @route url:    POST api/contacts
// @description:  Add a new contact
// @access perm:  Private
router.post("/", (req, res) => {
	res.send("Add new contact");
});

// @route url:    PUT api/contacts/:id (if you are going to update a contact, you need to be able to update a SPECIFIC(:id) contact)
// @description:  Update contact
// @access perm:  Private
router.put("/:id", (req, res) => {
	// always remember to update the route with ":id"
	res.send("Update a contact");
});

// @route url:    DELETE api/contacts/:id
// @description:  Delete contact
// @access perm:  Private
router.delete("/:id", (req, res) => {
	res.send("Delete a contact");
});

module.exports = router;
