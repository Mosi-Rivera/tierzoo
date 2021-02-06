import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { close,modal_enum,set_arena_loot } from '../../redux/reducers/r_modals';
import {string_to_number_formatter} from '../../helper';

export default function ModalArenaLoot(props)
{
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals);
    const handle_close = () => {dispatch(close()); dispatch(set_arena_loot(null));}
    return <Modal show={modals.active === modal_enum.arena_loot} onHide={handle_close} size="sm" centered>
        <Modal.Body className='border-light-shadow arena-loot'>
            <h3 style={{textAlign: 'center'}}>ARENA LOOT</h3>
            <ul className='item-list'>
                <li className="reverse-border-light-shadow">
                    <span className='icon gems-icon'></span>
                    <span className='quantity'>{string_to_number_formatter(modals.arena_loot)}</span>
                </li>
            </ul>
        </Modal.Body>
    </Modal>
}