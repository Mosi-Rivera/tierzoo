import {useSelector,useDispatch} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import modal_enum from '../../redux/other/modal_enum';
import {useHistory} from 'react-router-dom';

export default function ModalProfile(props)
{
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const active = useSelector(state => state.modals.active);
  const handle_close = () => import('../../redux/reducers/r_modals').then(res => dispatch(res.close()));
  const handle_logout = async () => {
    try
    {
      const {logout} = await import('../../api/routes/auth');
      const {USER_LOGOUT} = await import('../../redux/store');
      await logout();
      dispatch(USER_LOGOUT());
      history.push('/');
    }
    catch(err){}
  }
  return <Modal show={active === modal_enum.profile} onHide={handle_close} size={'sm'} centered>
    <ModalBody>
      <div style={{textAlign: 'center', marginBottom: '.5rem'}}>
        <h3>{user?.username}</h3>
        <span><span className='icon elo-icon' style={{padding: '.8rem'}}></span> {user?.arena.elo}</span>
      </div>
      <span onClick={handle_logout} className='button reverse-border-light-shadow'><span>logout</span></span>
    </ModalBody>
  </Modal>
}