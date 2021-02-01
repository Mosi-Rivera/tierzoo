import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { close,modal_enum, set, set_recap } from '../../redux/reducers/r_modals';
import image_configs from '../../sprites/config'; 
import {battle} from '../../api/routes/arena';
import {set_elo} from '../../redux/reducers/r_arena';

export default function(props)
{
    const dispatch = useDispatch();
    const active = useSelector(state => state.modals.active);
    const arena = useSelector(state => state.arena);
    const handle_battle = async () => {
        try
        {
            let result = await battle(arena.enemy_view?._id);
            console.log(result);
            dispatch(set_recap(result));
            dispatch(set_elo(result.elo));
            dispatch(set(modal_enum.battle_recap));
        }
        catch(err)
        {
            console.log(err);
        }
    }
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
            <span className='button reverse-border-light-shadow' onClick={handle_battle}><span>BATTLE!</span></span>
        </Modal.Body>
    </Modal>
}