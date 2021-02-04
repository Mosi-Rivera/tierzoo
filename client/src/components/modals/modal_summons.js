import React from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {close,modal_enum} from '../../redux/reducers/r_modals';
import sprite_configs from '../../sprites/config';
export default function ModalSummons(props)
{
    const dispatch = useDispatch();
    const modals = useSelector(state => state.modals);
    let summons = modals.summons;
    return <Modal show={modals.active === modal_enum.summons} onHide={() => dispatch(close())} centered>
        <Modal.Body className='border-light-shadow'>
            <h3 style={{textAlign: 'center'}}>SUMMONS</h3>
            <div className='item-list'>
                {
                    summons?.length ? summons.map((hero,i) => <div key={i}>
                            <span className={'image-container tier-' + hero.tier }>
                                <img src={sprite_configs[hero.name]?.src} alt={hero.name + "hero icon."}/>
                            </span>
                            <span className='name reverse-border-light-shadow'>{hero.name}</span>
                        </div>
                    ) : <div className='single-summon'>
                    <span className={'image-container tier-' + summons?.tier }>
                        <img src={sprite_configs[summons?.name]?.src} alt={summons?.name + "hero icon."}/>
                    </span>
                    <span className='name reverse-border-light-shadow'>{summons?.name}</span>
                </div>
                }
            </div>
        </Modal.Body>
    </Modal>
}