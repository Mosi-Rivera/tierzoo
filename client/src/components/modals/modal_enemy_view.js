import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { close,modal_enum } from '../../redux/reducers/r_modals';
import image_configs from '../../sprites/config'; 

export default function(props)
{
    const dispatch = useDispatch();
    const active = useSelector(state => state.modals.active);
    const arena = useSelector(state => state.arena);
    return <Modal show={active === modal_enum.enemy_view} onHide={() => dispatch(close())} centered>
        <Modal.Body className='border-light-shadow'>
            <h3 style={{textAlign: 'center'}}>{arena.enemy_view?.username}</h3>
            <span className='elo'>{arena.enemy_view?.arena?.elo}</span>
            <div className='c-c-team'>
                <ul className='c-team'>
                    {
                        arena.enemy_view?.team?.map((hero,i) => {
                            if (!hero)
                                return <li key={i} className='empty'>
                                    <span className='image-container empty tier-none'></span>
                                    <span className='level border-light-shadow'>none</span>
                                </li>
                            return <li key={i}>
                                <div>
                                    <span className={'image-container tier-' + hero.tier}>
                                        <img src={image_configs[hero.name]?.src}/>
                                    </span>
                                    <span className='level border-light-shadow'>Lv. {hero.level}</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <span className='button reverse-border-light-shadow'><span>BATTLE!</span></span>
        </Modal.Body>
    </Modal>
}