import {BASE_URL,error_handler} from '../environment';

export function signup(data)
{
    return fetch(BASE_URL + '/auth/signup',{
        methods: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler);
}

export function login(data)
{
    return fetch(BASE_URL + '/auth/login',{
        methods: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler);
}

export function delete_account()
{
    return fetch(BASE_URL + '/auth/delete_account',{
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler);
}

export function is_logged_in()
{
    return fetch(BASE_URL + '/auth/is_logged_in',{
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler);
}