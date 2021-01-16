import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get_inventory, get_my_team, collect_idle_rewards } from '../api/routes/user';
import { is_logged_in } from '../api/routes/auth';
import { get_opponents } from '../api/routes/arena';

export default function (props)
{
    const history = useHistory();
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
            props.set_opponents(await get_opponents());
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
                props.set_user(await is_logged_in());
                props.set_team(await get_my_team());
                props.set_opponents(await get_opponents());
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
                props.team.map((hero,i) => {
                    if (!hero)
                        return <li key={i} className='empty'>
                            <div>{i + 1}</div>
                        </li>
                    return <li key={i} className={'tier-' + hero.tier}>
                        <div>
                            <span lassName='name'>{hero.name}</span>
                            <span className='level'>Lvl {hero.level}</span>
                            <img src={'assets/heros/' + hero.name + '.png'}/>
                            <span className='power'>{hero.power}</span>
                        </div>
                    </li>
                })
            }
        </ul>
        <ul>
            {
                props.opponents.map((opp,i) =><li key={i}>
                    <span className='username'>{opp.username}</span>
                    <span className='elo'>{opp.arena.elo}</span>
                    <span className='view'>view</span>
                </li>)
            }
        </ul>
    </div>
}