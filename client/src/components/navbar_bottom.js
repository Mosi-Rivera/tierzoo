import { Link, useLocation } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import modal_enum from '../redux/other/modal_enum';
import collect_secs_to_str from '../collect_secs_to_str';

function NavbarBottom()
{
    const dispatch = useDispatch();
    const idle = useSelector(state => state.idle);
    const location = useLocation();
    const get_button_classname = str => {
        if (str === location.pathname)
            return 'active';
        return '';
    }
    const handle_rewards = async (e) => {
        try 
        {
            const {inc_item} = await import('../redux/reducers/r_inventory');
            const {set_rewards,set} = await import('../redux/reducers/r_modals');
            const {set_collect_timer} = await import('../redux/reducers/r_idle');
            const {collect_idle_rewards} = await import('../api/routes/user');
            let rewards = await collect_idle_rewards();
            dispatch(set_collect_timer(0));
            let keys = Object.keys(rewards);
            for (let i = keys.length; i--;)
                dispatch(inc_item({key: keys[i].replace('inventory.',''), value: rewards[keys[i]]}));
            dispatch(set_rewards(rewards));
            dispatch(set(modal_enum.reward));
        }
        catch(err){}
    }
    const handle_inventory = async (e) => {
        try
        {
            const {set} = await import('../redux/reducers/r_modals');
            const {get_inventory} = await import('../api/routes/user');
            const {set_inventory} = await import('../redux/reducers/r_inventory');
            dispatch(set_inventory(await get_inventory()));
            dispatch(set(modal_enum.inventory));
        }
        catch(err)
        {}
    }
    return <nav id='navbar-bottom'>
        <ul>
            <li className={'icon summon-icon hover ' + get_button_classname('/summon')}>
                <Link to='/summon'>
                    <span>summon</span>
                </Link>
            </li>
            <li onClick={handle_inventory} className='icon inventory-icon hover'>
                <span>inventory</span>
            </li>
            <li className='icon collect-icon hover' onClick={handle_rewards}>
                <span>collect</span>
                <span className='collect-timer'>{collect_secs_to_str(idle.timer)}</span>
            </li>
            <li className={'icon hero-icon hover ' + get_button_classname('/heroes')}>
                <Link to='/heroes'>
                    <span>heroes</span>
                </Link>
            </li>
            <li className={'icon arena-icon hover ' + get_button_classname('/arena')}>
                <Link to='arena'>
                    <span>arena</span>
                </Link>    
            </li>
        </ul>
    </nav>;
}

export default NavbarBottom;