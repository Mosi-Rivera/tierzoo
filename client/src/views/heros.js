import React, {useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import {get_heros} from '../api/routes/user';
import {is_logged_in} from '../api/routes/auth';

export default function(props)
{
    const history = useHistory();
    useEffect(function()
    {
        is_logged_in()
        .then(async () => {
            try
            {
                props.set_heros(await get_heros());
            }
            catch(err)
            {
                console.log(err);
            }
        })
        .catch(err => history.push('/'));
    },[]);
    return <div className='pseudo-body'>
        <ul>
            {
                props.heros.map((hero,i) => <Link key={i} to={'/hero-info?id='+hero._id}>
                    <li className={'tier-' + hero.tier} onClick={() => console.log(hero._id)}>
                        <span>{hero.name}</span>
                        <span>{hero.level}</span>
                        <img/>
                    </li>
                </Link>)
            }
        </ul>
    </div>
}