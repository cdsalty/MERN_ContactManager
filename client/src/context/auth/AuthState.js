import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
// TYPES:
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../types";

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem("token"), // look for an item of 'token' in localstorage
		isAuthenticated: null, // to tell us if a user is logged in or not
		loading: true, // can set to false, vice-versa...
		user: null, // in order to know what user we are working with
		error: null
	};

	// pull out "state and dispatch" from "useReducer"
	const [state, dispatch] = useReducer(authReducer, initialState); // state allows access anything inside the state, dispatch for dispatching objects to the reducer

	// List of ACTIONS

	// Load User: for checking which user is logged in

	// Register User: Sign the user up and get a token back

	// Login User: To Log the user in and get the token

	// Logout User: To destroy/delete the token

	// Clear Errors: To clear out any errors within the state.

	// return the providers in order to wrap the entire application with this context
	return (
		<AuthContext.Provider
			// anything that needs to be accessed from other components, including "state" and "actions" will need to go here
			// { props.children } tells React where the child components will be rendered
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
