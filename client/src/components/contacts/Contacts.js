// goal: to pull in contacts from the state; map through, create a list and output a ContactItem for each one.
import React, {Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
	// initilize the context (gives access to any state, methods/actions that are "associated" with this context.)
	const contactContext = useContext(ContactContext); // current state represents an array of objects

	// pull out/destructure contacts fom the  and bring in state from contactContext
	const {contacts} = contactContext;

	return (
		<Fragment>
			{contacts.map((contact) => (
				<h4>{contact.name}</h4>
			))}
		</Fragment>
	);
};

export default Contacts;
