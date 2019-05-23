/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { authHeader } from '../../utility/http.auth';

export const userService = {
    register,
    login,
    logout,
    getAll
};

function register(userName, firstName, lastName, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, firstName, lastName, password })
    };

    return fetch(`/auth/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function login(userName, password) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: authHeader(),
        body: JSON.stringify({ userName, password })
    };

    return fetch(`/auth/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwt-data', JSON.stringify(data));
            }

            return data;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt-data');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}