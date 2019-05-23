import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import usersReducer from './usersReducer';

export default combineReducers({
 authentication: authReducer,
 alert: alertReducer,
 usersApi: usersReducer
});