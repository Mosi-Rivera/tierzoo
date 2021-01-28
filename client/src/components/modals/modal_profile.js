import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';
import { USER_LOGOUT } from '../../redux/store';
import {useHistory} from 'react-router-dom';
import {logout} from '../../api/routes/auth';

export default function (props)
{
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const active = useSelector(state => state.modals.active);
    return <Modal show={active === modal_enum.profile} onHide={() => dispatch(close())} centered>
        <Modal.Body>
          <div>
            <h3>{user?.username}</h3>
            <span>{user?.level}</span>
            <span>{user?.arena.elo}</span>
            <span>{Math.floor(((user?.arena.wins || 0) / (user?.arena.losses || 1)) * 100)}wr</span>
          </div>
          <span onClick={() => logout()
            .then(() => {
              dispatch(USER_LOGOUT());
              history.push('/');
            })
            .catch(err => console.log(err))
          } className='button reverse-border-light-shadow'><span>logout</span></span>
        </Modal.Body>
      </Modal>
}