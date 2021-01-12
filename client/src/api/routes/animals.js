import {BASE_URL,error_handler} from '../environment';

export function animal_data(id)
{
    return fetch(BASE_URL + '/animal/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id})
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function delete_team()
{
    return fetch(BASE_URL + '/animal/delete_team',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler);
}

export function new_team(data)
{
    return fetch(BASE_URL + '/animal/new_team',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(error_handler)
    .then(res =>res.json());
}