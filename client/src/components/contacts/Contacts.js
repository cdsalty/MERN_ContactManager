// goal: to pull in contacts from the state; map through, create a list and output a ContactItem for each one.
import React, {Fragment, useContext} from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
	// initilize the context (gives access to any state, methods/actions that are "associated" with this context.)
	const contactContext = useContext(ContactContext); // current state represents an array of objects

	// pull out/destructure contacts fom the contactContext function inside ContactState to access state
	const {contacts, filtered} = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add contact(s)</h4>;
	}

	// filtered: need to search if filtered is not empty, is not null; in other words, if there is text inside the input box, then start calling this function/component

	return (
		<Fragment>
			{filtered !== null
				? filtered.map(contact => <ContactItem key={contact.id} contact={contact} />)
				: contacts.map(contact => (
						// <h4>{contact.name}</h4>
						// passing the props: key, contact
						<ContactItem key={contact.id} contact={contact} />
				  ))}
		</Fragment>
	);
};

export default Contacts;
