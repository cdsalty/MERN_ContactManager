import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT: // from ContactState
			return {
				...state,
				contacts: [...state.contacts, action.payload]
			};
		case UPDATE_CONTACT:
			return {
				...state,
				// map and for each contact, check the id to see if it matches the id being passed in the payload; return the new contact or return as is
				contacts: state.contacts.map(contact =>
					contact.id === action.payload.id ? action.payload : contact
				)
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
				// contacts: contacts.filter(contact => where the contact id is not equal to all contacts that are not the current id)
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload // the entire object
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null // set the object back to null
			};
		// Filtering Contacts (via contact or email)
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${action.payload}`, "gi"); // regex = the payload coming in; g: globally, i: insensitive, not case specific
					return contact.name.match(regex) || contact.email.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		default:
			return state;
	}
};

/*
Making use of useReducer functionality
1. Bring in the types (copy from Contact State)
2. Create the reducer function with switch cases
  - ...state (always bring in a copy existing state)
  - contacts: 
    - you can't change contact's since state is IMUTABLE; 
      - instead, copy what's already there using the spread operator, ...state.contacts, followed by what you want to add, 'action.payload'
      - in Contact State, I pass in the contact and add it to the dispatch's payload as 'contact'  (action.payload is the contact we're adding)

*/
