// Start off by bringing in the TYPES
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


export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // need to place the token we get back on success inside local storage (the name of what you are storing and the location it can be found)
      localStorage.setItem('token', action.payload.token);
      return {
        // returning back to state:
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      // remove any token from storage on any failed registration
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    default:
      return state;
  }
}

