import {BASE_URL,error_handler} from '../environment';

export function hero_info(id)
{
    return fetch(BASE_URL + '/hero/info?id=' + id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}

export function level_up(id)
{
    return fetch(BASE_URL + '/hero/level_up?id=' + id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}

export function summon_single_gems()
{
    return fetch(BASE_URL + '/hero/normal_summon_hero_single_gems',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}

export function summon_multiple_gems()
{
    return fetch(BASE_URL + '/hero/normal_summon_hero_multiple_gems',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}

export function summon_single_scrolls()
{
    return fetch(BASE_URL + '/hero/normal_summon_hero_single_scrolls',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}

export function summon_multiple_scrolls()
{
    return fetch(BASE_URL + '/hero/normal_summon_hero_multiple_scrolls',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(error_handler)
    .then(res => res.json());
}