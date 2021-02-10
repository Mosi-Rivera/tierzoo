import {useSelector,useDispatch} from 'react-redux';
import {close} from '../../redux/reducers/r_modals';
import modal_enum from '../../redux/other/modal_enum';
import { USER_LOGOUT } from '../../redux/store';
import {useHistory} from 'react-router-dom';
import {logout} from '../../api/routes/auth';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';

export default function ModalProfile(props)
{
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const active = useSelector(state => state.modals.active);
    return <Modal show={active === modal_enum.profile} onHide={() => dispatch(close())} size={'sm'} centered>
        <ModalBody>
          <div style={{textAlign: 'center', marginBottom: '.5rem'}}>
            <h3>{user?.username}</h3>
            <span><span className='icon elo-icon' style={{padding: '.8rem'}}></span> {user?.arena.elo}</span>
          </div>
          <span onClick={() => logout()
            .then(() => {
              dispatch(USER_LOGOUT());
              history.push('/');
            })
            .catch(err => {})
          } className='button reverse-border-light-shadow'><span>logout</span></span>
        </ModalBody>
      </Modal>
}