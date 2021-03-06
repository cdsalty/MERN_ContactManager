import React, {useReducer} from "react"; // gives access to state and to dispatch in order to dispatch to the reducer
import {v4 as uuidv4} from "uuid";
import ContactContext from "./contactContext"; // to access contactContext to share state (const contactContext = createContext();)
import contactReducer from "./contactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from "../types"; // only adding the one's that deal with contacts

// Create the Inital State: (initial value will be contacts; but further along, I will have request made to the backend to fill this)
const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: "Jill Johnson",
				email: "jjjustsayin@yahoo.com",
				phone: "111-111-1111",
				type: "personal"
			},
			{
				id: 2,
				name: "Sara Wacks",
				email: "saraiswacks@gmail.com",
				phone: "123-456-7890",
				type: "personal"
			},
			{
				id: 3,
				name: "Thealla Becrasey",
				email: "TheyAllBeCrazy@aol.com",
				phone: "555-555-5555",
				type: "professional"
			}
		],
		// current: null -> where I will place a contact when it's clicked to be edited
		current: null,
		// additional piece of state for filtering contacts
		filtered: null
	};

	// pull out "state and dispatch" from "useReducer" (will be used to access the contacts states in the provider value)
	const [state, dispatch] = useReducer(contactReducer, initialState); // state allows access anything inside the state, dispatch for dispatching objects to the reducer

	// List of ACTINS

	// ADD Contact
	const addContact = contact => {
		contact.id = uuidv4(); // will use mongo id at later point
		dispatch({type: ADD_CONTACT, payload: contact}); // dispatch this type and what to include in the payload.
	};
	// ** Be sure to pass it to the Provider to access it (anytime you want to access through a component from our contacts, it must be added here.)

	// DELETE Contact
	const deleteContact = id => {
		dispatch({type: DELETE_CONTACT, payload: id});
	};

	// SET CURRENT Contact
	const setCurrent = contact => {
		dispatch({type: SET_CURRENT, payload: contact});
	};

	// CLEAR CURRENT Contact (doesn't take in a parameter nor a payload because it will be set back to the null state)
	const clearCurrent = contact => {
		dispatch({type: CLEAR_CURRENT});
	};

	// UPDATE Contact
	const updateContact = contact => {
		dispatch({type: UPDATE_CONTACT, payload: contact});
	};

	// FILTER Contacts
	const filterContacts = text => {
		dispatch({type: FILTER_CONTACTS, payload: text});
	};

	// CLEAR FILTER for Contacts (from any filter created from above function; setting it back to null)
	const clearFilter = contact => {
		dispatch({type: CLEAR_FILTER});
	};

	// return the providers in order to wrap the entire application with this context
	return (
		<ContactContext.Provider
			// anything that needs to be accessed from other components, including "state" and "actions" will need to go here
			// { props.children } tells React where the child components will be rendered
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;

// we get access to state since we bring in useReducer, which has state... this is how I could bring in 'state' to contacts.
