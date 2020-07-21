const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
	// create relationship between contacts and users (each user has their own set of contacts)
	user: {
		type: mongoose.Schema.Types.ObjectId, // each document type, "model" have their own id;
		refer: "users" // reference the specific collection in the object
	},
	// The basic setup/data-points you want to have in your contact list... THE SCHEMA
	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
		//unique: true  <-- only required in the user schema
	},

	phone: {
		type: String // originally had as number and caused good headache
		// removed required but will change if necessary
	},

	type: {
		type: String,
		default: "personal" // personal or professional
	},

	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("contact", ContactSchema);
