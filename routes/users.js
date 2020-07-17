// REGISTRATION:
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @route url:    POST api/users
// @description:  Register a user
// @access perm:  Public
router.post("/", (req, res) => {
	res.send(req.body);
});

module.exports = router;

/*
- to use req.body, must add middleware inside app.js
*/
