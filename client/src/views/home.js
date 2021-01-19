import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get_inventory, get_my_team, collect_idle_rewards, get_heroes } from '../api/routes/user';
import { is_logged_in } from '../api/routes/auth';
import { get_opponents, set_team_position } from '../api/routes/arena';
import {Col,Row} from 'react-bootstrap';
import UserTeam from '../components/user_team';

export default function (props)
{
    const history = useHistory();
    const [power,set_power] = useState(0);
    const [show_heroes,set_show_heroes] = useState(false);
    const handle_inventory = async e => {
        try {
            props.set_show_inventory(await get_inventory());
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_get_opponents = async e => {
        try {
            props.set_opponents(await get_opponents());
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const team_props = {
        heroes: props.heroes,
        team: props.team,
        set_team: props.set_team,
    }
    useEffect(function()
    {
        props.check_logged_in(async () => {
            get_heroes()
            .then(res => props.set_heroes(res))
            .catch(err => console.log(err));

            get_my_team()
            .then(res => {
                let power = 0;
                if (res?.length)
                    for (let i = res.length; i--;)
                        power += res[i] ? res[i].power : 0;
                set_power(power);
                props.set_team(res)
            })
            .catch(err => console.log(err));
            
            get_opponents()
            .then(res => props.set_opponents(res))
            .catch(err => console.log(err));
        })
    },[]);
    return <div className='pseudo-body'>
        <Row>
            <Col sm={6}>
                <UserTeam {...team_props}/>
            </Col>
            <Col sm={6}>
            <span>refresh</span>
                <ul>
                    {
                        props.opponents.map((opp,i) =><li key={i}>
                            <span className='username'>{opp.username}</span>
                            <span className='elo'>{opp.arena.elo}</span>
                            <span className='view'>view</span>
                        </li>)
                    }
                </ul>
            </Col>
        </Row>
    </div>
}