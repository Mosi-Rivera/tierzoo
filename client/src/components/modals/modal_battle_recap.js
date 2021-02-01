import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { close,modal_enum } from '../../redux/reducers/r_modals';
import {Table} from 'react-bootstrap';
import sprite_configs from '../../sprites/config';
export default function(props)
{
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals);
    return <Modal show={modals.active === modal_enum.battle_recap} onHide={() => dispatch(close())} centered>
        <Modal.Body className='border-light-shadow'>
            <div className='modal-recap'>
                <h3>{modals.battle_recap?.winner == 0 ? 'VICTORY!' : 'DEFEAT'}</h3>
                <h3>
                    {modals.battle_recap?.elo}
                    ({(modals.battle_recap?.difference  > 0 ? "+" : "") + modals.battle_recap?.difference})
                </h3>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th></th>
                            <th>dealt</th>
                            <th>taken</th>
                            <th>healing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(modals)}
                        {
                            modals.battle_recap?.record.ally.map((stats,i) => <tr>
                                <td><span className='image-container'>
                                    <img src={sprite_configs[stats.name]?.src}/></span></td>
                                <td>{stats.dealt}</td>
                                <td>{stats.taken}</td>
                                <td>{stats.healing_done}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </Modal.Body>
    </Modal>
}