import {BASE_URL,error_handler} from '../environment';

export function set_team_position(position,id)
{
    return fetch(BASE_URL + '/arena/set_team_position',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({position,id})
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function get_opponents()
{
    return fetch(BASE_URL + '/arena/get_opponents',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function battle(id)
{
    return fetch(BASE_URL + '/arena/battle',{
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

export function get_match_history()
{
    return fetch(BASE_URL + '/arena/match_history',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res =>res.json());
}