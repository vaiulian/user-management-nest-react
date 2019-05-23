/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { userConstants } from '../constants/user.constants';
import { userService } from '../services/users.service';
import { alertActions } from './alertActions';
import { history } from '../../utility/history';

export const userAuthActions = {
    register,
    login,
    logout
};

function register(username, firstname, lastname, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.register(username, firstname, lastname, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}