import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';

export default function (props)
{
  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory);
  const active = useSelector(state => state.modals.active);
    return <Modal show={active === modal_enum.inventory} onHide={() => dispatch(close())} centered>
        <Modal.Body>
          <ul className='item-list'>
            {
              inventory && Object.keys(inventory).map((key,i) => {
                let value = inventory[key];
                if (value > 0)
                  return <li key={i}>{inventory[key]}</li>
                return null;
              })
            }
          </ul>
        </Modal.Body>
      </Modal>
}