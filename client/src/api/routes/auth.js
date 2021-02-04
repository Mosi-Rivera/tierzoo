import {BASE_URL,error_handler} from '../environment';

export function signup(data)
{
    return fetch(BASE_URL + '/auth/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler)
    .then(res => res.json());
}

export function login(data)
{
    return fetch(BASE_URL + '/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler)
    .then(res => res.json());;
}

export function delete_account()
{
    return fetch(BASE_URL + '/auth/delete_account',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler);
}

export function is_logged_in(get_team)
{
    return fetch(BASE_URL + '/auth/is_logged_in' + (get_team ? '?team=true' : ''),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res => res.json());;
}

export function logout()
{
    return fetch(BASE_URL + '/auth/logout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
}