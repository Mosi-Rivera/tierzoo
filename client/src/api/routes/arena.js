import {BASE_URL,error_handler} from '../environment';

export function get_opponents()
{
    return fetch(BASE_URL + '/arena/get_opponents',{
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });
}

export function battle(id)
{
    return fetch(BASE_URL + '/arena/battle',{
        methods: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id})
    });
}

export function get_match_history()
{
    return fetch(BASE_URL + '/arena/match_history',{
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
}