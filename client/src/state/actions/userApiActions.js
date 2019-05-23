/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { userConstants } from '../constants/user.constants';
import { userService } from '../services/users.service';
import { alertActions } from './alertActions';

export const userApiActions = {
    getAllUsers
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