import React, {useReducer} from "react"; // gives access to state and to dispatch in order to dispatch to the reducer
import uuid from "uuid";
import ContactContext from "./contactContext"; // not sure about the naming convention?? review later.
import contactReducer from "./contactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from "../types";

// create inital state  (initial value will be contacts but further along, I will have request made to the backend to fill this)
const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: "Jill-SayItAin't Johnson",
				email: "jjjustsayin@yahoo.com",
				phone: 111 - 111 - 1111,
				type: "personal"
			},
			{
				id: 2,
				name: "Sara Wacks",
				email: "saraiswacks@gmail.com",
				phone: 222 - 222 - 2222,
				type: "personal"
			},
			{
				id: 3,
				name: "Julia Almine",
				email: "alminej@aol.com",
				phone: 333 - 333 - 3333,
				type: "professional"
			}
		]
	};
	// pulling out "state and dispatch" from the "useReducer" hook (will use it to access the contacts states in the provider value)
	const [state, dispatch] = useReducer(contactReducer, initialState); // state allows access anything inside the state, dispatch for dispatching objects to the reducer

	// ACTOINS

	// ADD Contact

	// DELETE Contact

	// SET CURRENT Contact

	// CLEAR CURRENT Contact

	// UPDATE Contact

	// FILTER Contacts

	// CLEAR FILTER for Contacts (from any filter created from above function)

	// Wrapping the provider around the main/entire application
	return (
		<ContactContext.Provider
			// anything that needs to be accessed from other components, including state and "actions"
			// { props.children } tells React where the child components will be rendered
			value={{
				contacts: state.contacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;

// we get access to state since we bring in useReducer... this is how I was able to bring in 'state' to contacts.
