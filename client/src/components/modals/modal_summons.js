import {useSelector,useDispatch} from 'react-redux';
import {close} from '../../redux/reducers/r_modals';
import modal_enum from '../../redux/other/modal_enum';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';

export default function ModalSummons(props)
{
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals);
    let summons = modals.summons;
    return <Modal show={modals.active === modal_enum.summons} onHide={() => dispatch(close())} centered>
            <ModalBody className='border-light-shadow'>
                <h3 style={{textAlign: 'center'}}>SUMMONS</h3>
                <div className='item-list'>
                    {
                        summons?.length ? summons.map((hero,i) => <div key={hero._id}>
                                <span className={'image-container tier-' + hero.tier }>
                                    <img src={`assets/${hero.name}/icon.png`} alt={hero.name + "hero icon."}/>
                                </span>
                                <span className='name reverse-border-light-shadow'>{hero.name}</span>
                            </div>
                        ) : <div className='single-summon'>
                        <span className={'image-container tier-' + summons?.tier }>
                            <img src={`assets/${summons?.name}/icon.png`} alt={summons?.name + "hero icon."}/>
                        </span>
                        <span className='name reverse-border-light-shadow'>{summons?.name}</span>
                    </div>
                    }
                </div>
            </ModalBody>
        </Modal>
}