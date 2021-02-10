import {useSelector,useDispatch} from 'react-redux';
import string_to_number_formatter from '../../string_number_formatter';
import {close} from '../../redux/reducers/r_modals';
import modal_enum from '../../redux/other/modal_enum';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';

export default function ModalInventory(props)
{
  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory);
  const active = useSelector(state => state.modals.active);
    return <Modal show={active === modal_enum.inventory} onHide={() => dispatch(close())} centered>
        <ModalBody className='border-light-shadow'>
        <h3 style={{textAlign: 'center'}}>INVENTORY</h3>
          <ul className='item-list'>
            {
              inventory && Object.keys(inventory).map(key => {
                let value = inventory[key];
                if (value > 0)
                  return <li className='reverse-border-light-shadow' key={key}>
                    <span className={'icon ' + key + '-icon'}></span>
                    <span className='quantity'>
                      {string_to_number_formatter(inventory[key])}
                    </span>
                  </li>
                return null;
              })
            }
          </ul>
        </ModalBody>
      </Modal>
}