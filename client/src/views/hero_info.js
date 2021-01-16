import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { is_logged_in } from '../api/routes/auth';
import qs from 'query-string';
import { hero_info } from '../api/routes/hero';
import {error_handler} from '../api/environment';

export default function (props)
{
    const history = useHistory();
    const [info,set_info] = useState(null);
    useEffect(function(){
        is_logged_in()
        .then(async res => {
            try
            {
                let parsed = qs.parse(history.location.search);
                console.log(parsed);
                set_info(await hero_info(parsed.id));
            }
            catch(err)
            {
                history.push('/heros');
            }
        })
        .catch(err => history.push('/'));
    },[]);
    return <div className='pseudo-body'>
        <h3>{info?.name}</h3>
    </div>
}