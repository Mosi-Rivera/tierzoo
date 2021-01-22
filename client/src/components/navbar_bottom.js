import React from 'react';
import { Link } from 'react-router-dom';
import {collect_idle_rewards, get_inventory} from '../api/routes/user';
import {useSelector,useDispatch} from 'react-redux';
import {inc_item, set_inventory} from '../redux/reducers/r_inventory';
import r_modals, {set,modal_enum, set_rewards} from '../redux/reducers/r_modals';

export default function (props)
{
    const dispatch = useDispatch();
    const handle_rewards = async (e) => {
        try 
        {
            let rewards = await collect_idle_rewards();
            let keys = Object.keys(rewards);
            for (let i = keys.length; i--;)
                dispatch(inc_item({key: keys[i], value: rewards[keys[i]]}));
            dispatch(set_rewards(rewards));
            dispatch(set(modal_enum.reward));
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_inventory = async (e) => {
        try
        {
            dispatch(set_inventory(await get_inventory()));
            dispatch(set(modal_enum.inventory));
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return <nav id='navbar-bottom'>
        <ul>
            <Link to='/summon'><li className='icon summon-icon'></li></Link>
            <li onClick={handle_inventory} className='icon inventory-icon'></li>
        </ul>
        <div className='icon collect-icon' onClick={handle_rewards}></div>
        <ul>
            <Link to='/heroes'><li className='icon hero-icon'></li></Link>
            <Link to='arena'><li className='icon arena-icon'></li></Link>
        </ul>
    </nav>;
}