import {SET_ALERT, REMOVE_ALERT} from "../types";

export default (state, action) => {
	// add the switch with the action type, set the case and the result for each case (set_alert and remove_alert)
	switch (action.type) {
		case SET_ALERT:
			// be sure to return in array format since that was the initial value
			return [...state, action.payload];
		case REMOVE_ALERT:
			// need to filter out and apply the correct alert by the alert id (when we originally remove an alert, all we pass is the id)
			return state.filter(alert => alert.id !== action.payload);
		default:
			return state;
	}
};

// 1. import set_alert and remove_alert
// 2. export default the SWITCH STATMENT; it will take the state and action (add the cases for set alert and remove alert )
// 3. create a new component that will output the alert
