/* eslint-disable import/prefer-default-export */
export function authHeader() {
    // return authorization header with jwt token
    const data = JSON.parse(localStorage.getItem('jwt-data'));

    const header = { 'Content-Type': 'application/json' };

    if (data && data.access_token) {
        // eslint-disable-next-line prefer-template
        header.Authorization = 'Bearer ' + data.access_token ;
    } 

    return header;
}
