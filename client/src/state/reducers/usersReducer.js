/* eslint-disable import/prefer-default-export */
import { userConstants } from '../constants/user.constants';

const initialState = { isRequesting: false, users: [], error: null}

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
    default:
      return state
  }
}