/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { userConstants } from '../constants/user.constants';
import { userService } from '../services/users.service';
import { alertActions } from './alertActions';
import { history } from '../../utility/history';

export const userApiActions = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
};

function getAllUsers() {
    return dispatch => {

        dispatch(request());

        userService.getAll()
            .then(
                users => { 
                    dispatch(success(users));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function deleteUser(id) {
    return dispatch => {


        userService.deleteUser(id)
            .then(
                 () => { 
                    dispatch(success(id));
                    dispatch(alertActions.success('User was deleted'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(userId) { return { type: userConstants.DELETE_SUCCESS, userId } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}

function getUser(id) {
    return dispatch => {

        userService.getOne(id)
            .then(
                 (user) => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETONE_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {

        userService.updateOne(user)
            .then(
                 () => { 
                    dispatch(success());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success() { return { type: userConstants.UPDATE_SUCCESS } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}