const express = require("express");
const router = express.Router();

// @route request:  GET api/auth
// @purpose:        To get logged in user
// @access perm:    PRIVATE
router.get("/", (req, res) => {
	res.send("Get Logged In User");
});

// @route request:  POST api/auth (post method because it needs to send out & authenticate the data)
// @purpose:        Autorize user & get token
// @access perm:    PUBLIC
router.post("/", (req, res) => {
	res.send("Log In User");
});

module.exports = router;
