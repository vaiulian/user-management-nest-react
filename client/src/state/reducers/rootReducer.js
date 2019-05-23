import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import usersReducer from './usersReducer';

export default combineReducers({
 simpleReducer,
 authentication: authReducer,
 alert: alertReducer,
 usersApi: usersReducer
});