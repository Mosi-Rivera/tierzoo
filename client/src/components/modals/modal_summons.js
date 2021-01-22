import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';

export default function (props)
{
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals);
    let summons = modals.summons;
    return <Modal show={modals.active === modal_enum.summons} onHide={() => dispatch(close())} centered>
        <Modal.Body>
            <ul>
                {
                    summons && summons.map((hero,i) => 
                        <li key={i}>{hero.name}</li>
                    )
                }
            </ul>
        </Modal.Body>
    </Modal>
}