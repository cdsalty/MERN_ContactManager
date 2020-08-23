import React, { useReducer } from "react";
import axios from 'axios';
import authReducer from "./authReducer";
import AuthContext from "./authContext";

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

	// Register User: Sign the user up and get a token back(create a asynchronous function that will take in the formData)
	const register = async (formData) => {
		// create config for header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		// Make request: 
		try {
			// create a variable that will hold the response we get back from making a post request
			// this request will take: the url, the formData and the config from above.
			// make request and on success, we should recieve a token with the payload
			// if everything from the post request is ok, dispatch to the reducer the type and payload
			// the payload will be the response from above which is the T O K E N
			const res = await axios.post('/api/users', formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			// the catch will be called from the users.js backend when a user already exists, etc. 
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			})
		}

	}



	// Login User: To Log the user in and get the token

	// Logout User: To destroy/delete the token

	// Clear Errors: To clear out any errors within the state.

	// return the providers in order to wrap the entire application with this context
	return (
		<AuthContext.Provider
			// anything that needs to be accessed from other components, including "state" and "actions" will need to go here
			// { props.children } tells React where the child components will be rendered
			value={ {
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error
			} }
		>
			{ props.children }
		</AuthContext.Provider>
	);
};

export default AuthState;
