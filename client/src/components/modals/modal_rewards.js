import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';
import {string_to_number_formatter} from '../../helper';

export default function ModalRewards(props)
{
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modals);
  let rewards = modals.rewards;
    return <Modal show={modals.active === modal_enum.reward} onHide={() => dispatch(close())} centered>
        <Modal.Body className='border-light-shadow'>
          <h3 style={{textAlign: 'center'}}>IDLE REWARDS</h3>
          <ul className='item-list'>
            {
              rewards && Object.keys(rewards).map(key => {
                let value = rewards[key];
                if (value > 0)
                  return <li key={key} className='reverse-border-light-shadow'>
                    <span className={'icon ' + key + '-icon'}></span>
                    <span className='quantity'>{
                      string_to_number_formatter(rewards[key])
                    }</span>
                  </li>
                return null;
              })
            }
          </ul>
        </Modal.Body>
      </Modal>
}