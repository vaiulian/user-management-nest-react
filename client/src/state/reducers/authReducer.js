/* eslint-disable import/prefer-default-export */
import { userConstants } from '../constants/user.constants';

const user = JSON.parse(localStorage.getItem('jwt-data'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}