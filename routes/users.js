// REGISTRATION:
const express = require("express");
const router = express.Router();

// @route url:    POST api/users
// @description:  Register a user
// @access perm:  Public
router.post("/", (req, res) => {
	res.send("Register a user");
});

module.exports = router;
