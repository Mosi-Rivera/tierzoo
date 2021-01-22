import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';

export default function (props)
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const active = useSelector(state => state.modals.active);
    return <Modal show={active === modal_enum.profile} onHide={() => dispatch(close())} centered>
        <Modal.Body>
          <h3>{user?.username}</h3>
          <span>{user?.level}</span>
          <span>{user?.arena.elo}</span>
          <span>{Math.floor((user?.arena.wins/user?.arena.losses) * 100)} wr</span>
        </Modal.Body>
      </Modal>
}