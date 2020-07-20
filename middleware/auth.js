const jwt = require("jsonwebtoken"); // bring in jwt to verify the token
const config = require("config");

// GOAL: create middlewareto validate token and access protected routes (send token in header)
// anytime I need to protect a route, I can pull out and run this middleware function

module.exports = function(req, res, next) {
	// Get token from header ('x-auth-token' is the key to the token inside the header)
	const token = req.header("x-auth-token");
	// Check if token exist
	if (!token) {
		return res.status(401).json({message: "No token, authorization denied"});
	}
	// if there is a token, need to verify it
	try {
		// by this point, I have the token and need to verify it
		const decoded = jwt.verify(token, config.get("jwtSecret")); // VERIFING the object/payload and storing it inside decoded
		// pull the USER OUT and ASSIGN to the REQUEST OBJECT
		// **** THIS IS HOW I GET ACCESS TO IT INSIDE THE ROUTE *****
		req.user = decoded.user; // assigning the user to the 'user' of the payload, which is decoded. not assigning it to the entire object
		next();
	} catch (error) {
		res.status(401).json({message: "Token NOT Valid"});
	}
};
