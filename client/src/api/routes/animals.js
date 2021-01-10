import {BASE_URL,error_handler} from '../environment';

export function animal_data(id)
{
    return fetch(BASE_URL + '/animal/login',{
        methods: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id})
    });
}

export function delete_team()
{
    return fetch(BASE_URL + '/animal/delete_team',{
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
}

export function new_team(data)
{
    return fetch(BASE_URL + '/animal/new_team',{
        methods: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
}