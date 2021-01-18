import React from 'react';
import { Link } from 'react-router-dom';
import {collect_idle_rewards, get_inventory} from '../api/routes/user';
export default function (props)
{
    const handle_rewards = async (e) => {
        try 
        {
            props.set_rewards(await collect_idle_rewards());
            props.show_rewards();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_inventory = async (e) => {
        try
        {
            props.set_inventory(await get_inventory());
            props.show_inventory();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return <nav id='navbar-bottom'>
        <ul>
            <li><Link to='/summon'>S</Link></li>
            <li onClick={handle_inventory}>I</li>
        </ul>
        <div onClick={handle_rewards}>C</div>
        <ul>
            <li><Link to='/heros'>H</Link></li>
            <li><Link to='/arena'>A</Link></li>
        </ul>
    </nav>;
}