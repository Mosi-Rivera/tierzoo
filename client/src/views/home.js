import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get_inventory, get_my_team, collect_idle_rewards } from '../api/routes/user';
import { is_logged_in } from '../api/routes/auth';
import { get_opponents } from '../api/routes/arena';

export default function (props)
{
    const history = useHistory();
    const handle_rewards = async (e) => {
        try 
        {
            props.set_show_rewards(await collect_idle_rewards());
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_inventory = async e => {
        try {
            props.set_show_inventory(await get_inventory());
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_get_opponents = async e => {
        try {
            props.set_show_arena_opponents(await get_opponents);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(function()
    {
        (async () => {
            try
            {
                props.set_user(await is_logged_in())
                props.set_team(await get_my_team());
                console.log(props.team);
            }
            catch(err)
            {
                history.push('/');
            }
        })();
    },[]);
    return <div className='pseudo-body'>
        <ul className='c-team'>
            {
                props.team.map((data,i) => <li onClick={() => props.set_show_animal(data)} key={i}>
                    <h3>{data.species}</h3>
                    <span>{data.level}</span>
                    <img src={'/assets/animals/' + data.species + '.png'}/>
                </li>)
            }
        </ul>
        <div onClick={handle_inventory}>COLLECT REWARDS</div>
        <div onClick={handle_get_opponents}>arena</div>
    </div>
}