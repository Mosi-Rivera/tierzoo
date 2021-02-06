import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get_heroes } from '../api/routes/user';
import { get_opponents } from '../api/routes/arena';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserTeam from '../components/user_team';
import {useDispatch,useSelector} from 'react-redux';
import { modal_enum,set } from '../redux/reducers/r_modals';
import { set_opponents } from '../redux/reducers/r_arena';
import { check_logged_in } from '../helper';
import { set_team } from '../redux/reducers/r_team';
import { set_all } from '../redux/reducers/r_heroes';
import {set_enemy} from '../redux/reducers/r_arena';
import ModalArenaLoot from '../components/modals/modal_arena_loot';
import ModalBattleRecap from '../components/modals/modal_battle_recap';
import ModalEnemyView from '../components/modals/modal_enemy_view';
export default function ViewHome (props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const arena = useSelector(state => state.arena);
    const handle_get_opponents = async e => {
        try {
            dispatch(set_opponents(await get_opponents()));
        }
        catch(err){}
    }
    useEffect(function()
    {
        check_logged_in(history,async (user,team) => {
            dispatch(set_team(team));

            get_heroes()
            .then(res => dispatch(set_all(res)))
            .catch(err => {});
            
            handle_get_opponents();
        },true)
    },[]);
    return <div className='pseudo-body'>
        <ModalArenaLoot/>
        <ModalBattleRecap/>
        <ModalEnemyView/>
        <Row>
            <Col md={5}>
                <UserTeam/>
            </Col>
            <Col md={7}>
                <div className='c-challenge'>
                    <div className='c-header shadow border-light-shadow'>
                        <span className='title'>CHALLENGE</span>
                        <span onClick={handle_get_opponents} style={{alignSelf: 'flex-end'}} className='refresh reverse-border-light-shadow button'>
                            <span>refresh</span>
                        </span>
                    </div>
                    <div className='c-opponents'>
                        <Row>
                            {
                                arena?.opponents.map(opp => <Col key={opp._id} sm={6}>
                                    <div onClick={
                                        () => {
                                            dispatch(set_enemy(opp));
                                            dispatch(set(modal_enum.enemy_view));
                                        }
                                    } className='c-opponent-data shadow border-light-shadow'>
                                        <span className='username'>{opp.username}</span>
                                        <span className='elo'>
                                            <span className='icon elo-icon'></span>
                                            {opp.arena.elo}
                                        </span>
                                        <span className='victories'>{opp.arena.wins}</span>
                                    </div>
                                </Col>)
                            }
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}