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
		case DELETE_CONTACT:
			return {
				...state,
				contacts: contacts.filter(contact => contact.id !== action.payload)
				// contacts: contacts.filter(contact => where the contact id is not equal to all contacts that are not the current id)
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
