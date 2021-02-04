import React from 'react';
import { Link } from 'react-router-dom';
import {collect_idle_rewards, get_inventory} from '../api/routes/user';
import {useSelector,useDispatch} from 'react-redux';
import {inc_item, set_inventory} from '../redux/reducers/r_inventory';
import {set,modal_enum, set_rewards} from '../redux/reducers/r_modals';
import {set_collect_timer} from '../redux/reducers/r_idle';
import { collect_secs_to_str } from '../helper';

export default function NavbarBottom(props)
{
    const dispatch = useDispatch();
    const idle = useSelector(state => state.idle);
    const handle_rewards = async (e) => {
        try 
        {
            let rewards = await collect_idle_rewards();
            dispatch(set_collect_timer(0));
            let keys = Object.keys(rewards);
            for (let i = keys.length; i--;)
                dispatch(inc_item({key: keys[i].replace('inventory.',''), value: rewards[keys[i]]}));
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
            <Link to='/summon'><li className='icon summon-icon hover'>
                <span>summon</span>
            </li></Link>
            <li onClick={handle_inventory} className='icon inventory-icon hover'>
                <span>inventory</span>
            </li>
        </ul>
        <div className='icon collect-icon hover' onClick={handle_rewards}>
            <span>collect</span>
            <span className='collect-timer'>{collect_secs_to_str(idle.timer)}</span>
        </div>
        <ul>
            <Link to='/heroes'><li className='icon hero-icon hover'>
                <span>heroes</span>
            </li></Link>
            <Link to='arena'><li className='icon arena-icon hover'>
                <span>arena</span>    
            </li></Link>
        </ul>
    </nav>;
}