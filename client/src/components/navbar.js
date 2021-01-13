import React from 'react';
import { Link } from 'react-router-dom';
import {collect_idle_rewards} from '../api/routes/user';
export default function (props)
{
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
    const handle_inventory = (e) => {

    }
    return <nav id='navbar'>
        <ul>
            <li><Link to='/summon'>SUMMON</Link></li>
            <li onClick={handle_inventory}>INVENTORY</li>
        </ul>
        <div onClick={handle_rewards}>COLLECT</div>
        <ul>
            <li><Link to='/heros'>HEROS</Link></li>
            <li><Link to='/arena'>ARENA</Link></li>
        </ul>
    </nav>;
}