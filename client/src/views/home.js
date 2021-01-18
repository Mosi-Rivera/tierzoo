import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get_inventory, get_my_team, collect_idle_rewards } from '../api/routes/user';
import { is_logged_in } from '../api/routes/auth';
import { get_opponents } from '../api/routes/arena';
import {Col,Row} from 'react-bootstrap';

export default function (props)
{
    const history = useHistory();
    const [power,set_power] = useState(0);
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
    useEffect(function()
    {
        props.check_logged_in(async () => {
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
        is_logged_in()
    },[]);
    return <div className='pseudo-body'>
        <Row>
            <Col sm={6}>
                <ul className='c-team'>
                    {
                        props.team.map((hero,i) => {
                            if (!hero)
                                return <li key={i} className='empty'>
                                    <div>{i + 1}</div>
                                </li>
                            return <li key={i} className={'tier-' + hero.tier}>
                                <div>
                                    <span lassName='name'>{hero.name}</span>
                                    <span className='level'>Lvl {hero.level}</span>
                                    <img src={'assets/heros/' + hero.name + '.png'}/>
                                    <span className='power'>{hero.power}</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
                <h3 className='team-power'>{power}</h3>
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