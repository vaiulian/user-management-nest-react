/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import { userConstants } from '../constants/user.constants';

const initialState = { isRequesting: false,
  users: [], 
  user: { 
    userName: '',
    firstName: '',
    lastName: ''
  }, error: null}

export default (state = initialState, action) => {
  switch (action.type) {

    case userConstants.GETALL_SUCCESS:
    return Object.assign({}, state, {
        isRequesting: false,
        users: action.users
    });
    case userConstants.GETALL_FAILURE:
    return Object.assign({}, state, {
        isRequesting: false,
        error: action.error
    });
    case userConstants.GETALL_REQUEST:
    return Object.assign({}, state, {
        isRequesting: true
    });

    case userConstants.DELETE_SUCCESS:
    const newUsers = state.users.filter(val => val.id !== action.userId );
    return Object.assign({}, state, {
        isRequesting: false,
        users: newUsers
    });
    case userConstants.DELETE_FAILURE:
      return state

    case userConstants.GETONE_SUCCESS:
    return Object.assign({}, state, {
        isRequesting: false,
        user: action.user
    });
    case userConstants.GETONE_FAILURE:
      return state

    default:
      return state
  }
}