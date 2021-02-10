import {useSelector,useDispatch} from 'react-redux';
import string_to_number_formatter from '../string_number_formatter';
import modal_enum from '../redux/other/modal_enum';

function NavbarTop()
{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const inventory = useSelector(state => state.inventory);
    const handle_open_profile = () => import("../redux/reducers/r_modals").then(res => dispatch(res.set(modal_enum.profile))); 
    return <nav id='navbar-top'>
        <ul>
            <li className='hover' onClick={handle_open_profile}>{user?.username}</li>
        </ul>
        <ul className='c-inventory'>
            <li>
                <span className='icon scroll-icon'></span>
                <span>{inventory?.scrolls}</span>
            </li>
            <li>
                <span className='icon gold-icon'></span>
                <span>{string_to_number_formatter(inventory?.gold)}</span>
            </li>
            <li>
                <span className='icon gems-icon'></span>
                <span>{inventory?.gems}</span>
            </li>
        </ul>
    </nav>
}

export default NavbarTop;