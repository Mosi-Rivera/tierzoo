import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get_inventory, get_my_team, collect_idle_rewards, get_heroes } from '../api/routes/user';
import { is_logged_in } from '../api/routes/auth';
import { get_opponents, set_team_position } from '../api/routes/arena';
import {Col,Row} from 'react-bootstrap';
import UserTeam from '../components/user_team';
import {useDispatch,useSelector} from 'react-redux';
import { modal_enum,set } from '../redux/reducers/r_modals';
import { set_opponents } from '../redux/reducers/r_arena';
import { check_logged_in } from '../helper';
import { set_team } from '../redux/reducers/r_team';
import { set_all } from '../redux/reducers/r_heroes';
export default function (props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const arena = useSelector(state => state.arena);
    const handle_get_opponents = async e => {
        try {
            dispatch(set_opponents(await get_opponents()));
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(function()
    {
        check_logged_in(history,async (user,team) => {
            dispatch(set_team(team));

            get_heroes()
            .then(res => dispatch(set_all(res)))
            .catch(err => console.log(err));
            
            get_opponents()
            .then(res => dispatch(set_opponents(res)))
            .catch(err => console.log(err));
        },true)
    },[]);
    return <div className='pseudo-body'>
        <Row>
            <Col md={5}>
                <UserTeam/>
            </Col>
            <Col md={7}>
                <div className='c-challenge'>
                    <div className='c-header shadow border-light-shadow'>
                        <span className='title'>CHALLENGE</span>
                        <span className='refresh border-light-shadow'>
                            <span>refresh</span>
                        </span>
                    </div>
                    <div className='c-opponents'>
                        <Row>
                            {
                                arena?.opponents.map((opp,i) => <Col key={i} sm={6}>
                                    <div className='c-opponent-data shadow border-light-shadow'>
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