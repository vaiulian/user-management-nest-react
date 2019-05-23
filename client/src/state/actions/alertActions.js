/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { alertConstants } from '../constants/alert.constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}