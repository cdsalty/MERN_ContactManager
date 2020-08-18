import React, {useReducer} from "react";
import {v4 as uuidv4} from "uuid"; // contact.id = uuidv4(); (will need since we'll have an array of alerts; that need to be unique identifier)
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

// TYPES:
import {
	// the only two types needed for alert:
	SET_ALERT,
	REMOVE_ALERT
} from "../types";

const AlertState = props => {
	// initialState will be an array of alert objects...
	const initialState = [];

	// pull out "state and dispatch" from "useReducer"
	const [state, dispatch] = useReducer(alertReducer, initialState); // state allows access anything inside the state, dispatch for dispatching objects to the reducer

	// ACTION:  SETALERT()
	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuidv4(); // generates a random id
		// call dispatch and set type to Set alert with the payload; (the payload will consist of the message, the type and id)
		dispatch({
			type: SET_ALERT,
			payload: {msg, type, id}
		});
		// Alert to disappear after a certain amount of time
		setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout); // dispatch the id of the payload and have the alert removed after 5 seconds
	};

	// List of ACTIONS

	// return the providers in order to wrap the entire application with this context
	return (
		<AlertContext.Provider
			// anything that needs to be accessed from other components, including "state" and "actions" will need to go here
			// { props.children } tells React where the child components will be rendered
			value={{
				// the actions of the state
				alerts: state,
				setAlert // action
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;

// remember, to make use of this file, bring it in App.js and call it within.
