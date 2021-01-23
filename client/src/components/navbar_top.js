import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { string_to_number_formatter } from '../helper';
import {set,modal_enum} from '../redux/reducers/r_modals';
export default function (props)
{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const inventory = useSelector(state => state.inventory);
    return <nav id='navbar-top'>
        <ul>
            <li onClick={() => set(modal_enum.profile)}>{user?.username}</li>
        </ul>
        <ul className='c-inventory'>
            <li>
                <span className='icon scroll-icon'></span>
                <span>{string_to_number_formatter(inventory?.scrolls)}</span>
            </li>
            <li>
                <span className='icon gold-icon'></span>
                <span>{string_to_number_formatter(inventory?.gold)}</span>
            </li>
            <li>
                <span className='icon gem-icon'></span>
                <span>{string_to_number_formatter(inventory?.gems)}</span>
            </li>
        </ul>
    </nav>
}