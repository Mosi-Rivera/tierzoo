import { useSelector, useDispatch } from 'react-redux';
import modal_enum from '../../redux/other/modal_enum';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';

export default function ModalEnemyView(props)
{
    const dispatch = useDispatch();
    const active = useSelector(state => state.modals.active);
    const arena = useSelector(state => state.arena);
    const handle_battle = async () => {
        try
        {
            const {battle,get_opponents} = await import('../../api/routes/arena');
            const {set,set_recap,set_arena_loot} = await import('../../redux/reducers/r_modals');
            const {set_elo,set_opponents} = await import('../../redux/reducers/r_arena');
            let result = await battle(arena.enemy_view?._id);
            if (result.loot)
            {
                const {inc_item} = await import('../../redux/reducers/r_inventory');
                dispatch(inc_item({key: 'gems',value: result.loot}));
                dispatch(set_arena_loot(result.loot));
            }
            dispatch(set_recap(result));
            dispatch(set_elo(result.elo + result.difference));
            dispatch(set(modal_enum.battle_recap));
            dispatch(set_opponents(await get_opponents()));
        }
        catch(err){}
    }
    const handle_close = () => import('../../redux/reducers/r_modals').then(res => dispatch(res.close()));
    return <Modal show={active === modal_enum.enemy_view} onHide={handle_close} centered>
        <ModalBody className='border-light-shadow'>
            <h3 style={{textAlign: 'center'}}>{arena.enemy_view?.username}</h3>
            <span style={{textAlign: 'center', display: 'block'}} className='elo'><span className='icon elo-icon'></span>{arena.enemy_view?.arena?.elo}</span>
            <div className='c-c-team'>
                <ul className='c-team'>
                    {
                        arena.enemy_view?.team?.map((hero,i) => {
                            if (!hero)
                                return <li key={hero._id} className='empty'>
                                    <span className='image-container empty tier-none'></span>
                                    <span className='level border-light-shadow'>none</span>
                                </li>
                            return <li key={hero._id}>
                                <div>
                                    <span className={'image-container tier-' + hero.tier}>
                                        <img src={`assets/${hero.name}/icon.png`} alt={hero.name + "hero icon."}/>
                                    </span>
                                    <span className='level border-light-shadow'>Lv. {hero.level}</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <span className='button reverse-border-light-shadow' onClick={handle_battle}><span>BATTLE!</span></span>
        </ModalBody>
    </Modal>
}