/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { authHeader } from '../../utility/http.auth';

export const userService = {
    register,
    login,
    logout,
    getAll,
    deleteUser,
    getOne,
    updateOne,
    addOne
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
    localStorage.removeItem('jwt-data');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function updateOne(user) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function addOne(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
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