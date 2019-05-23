/* eslint-disable import/prefer-default-export */
export function authHeader() {
    // return authorization header with jwt token
    const data = JSON.parse(localStorage.getItem('jwt-data'));

    if (data && data.access_token) {
        // eslint-disable-next-line prefer-template
        return { 'Authorization': 'Bearer ' + data.access_token };
    } 

    return {};

}