import {BASE_URL,error_handler} from '../environment';

export function get_heroes()
{
    return fetch(BASE_URL + '/user/heroes',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function get_my_team()
{
    return fetch(BASE_URL + '/user/team',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function get_inventory()
{
    return fetch(BASE_URL + '/user/inventory',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res =>res.json());
}

export function collect_idle_rewards()
{
    return fetch(BASE_URL + '/user/collect',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    .then(error_handler)
    .then(res =>res.json());
}