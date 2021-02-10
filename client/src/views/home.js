import { useEffect, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { get_heroes } from '../api/routes/user';
import { get_opponents } from '../api/routes/arena';
import {useDispatch,useSelector} from 'react-redux';
import modal_enum from '../redux/other/modal_enum';
import { set } from '../redux/reducers/r_modals';
import { set_opponents } from '../redux/reducers/r_arena';
import { check_logged_in } from '../helper';
import { set_team } from '../redux/reducers/r_team';
import { set_all } from '../redux/reducers/r_heroes';
import {set_enemy} from '../redux/reducers/r_arena';

const Col               = lazy(() => import('react-bootstrap/Col'));
const Row               = lazy(() => import('react-bootstrap/Row'));
const ModalArenaLoot    = lazy(() => import("../components/modals/modal_arena_loot"));
const ModalBattleRecap  = lazy(() => import("../components/modals/modal_battle_recap"));
const ModalEnemyView    = lazy(() => import("../components/modals/modal_enemy_view"));
const UserTeam          = lazy(() => import("../components/user_team"));

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
        <Suspense fallback={<div>landing</div>}>
            <ModalArenaLoot/>
            <ModalBattleRecap/>
            <ModalEnemyView/>
        </Suspense>
        <Suspense fallback={<div>loading</div>}>
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
        </Suspense>
    </div>
}