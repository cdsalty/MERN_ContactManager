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

      return {

      }
    default:
      return state;
  }
}