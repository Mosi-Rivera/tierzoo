import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';
import {string_to_number_formatter} from '../../helper';

export default function (props)
{
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modals);
  let rewards = modals.rewards;
    return <Modal show={modals.active === modal_enum.reward} onHide={() => dispatch(close())} centered>
        <Modal.Body>
          <h3 style={{textAlign: 'center'}}>IDLE REWARDS</h3>
          <ul className='item-list'>
            {
              rewards && Object.keys(rewards).map((key,i) => {
                let value = rewards[key];
                if (value > 0)
                  return <li key={i}>
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