import React, {useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import {get_heroes} from '../api/routes/user';
import {is_logged_in} from '../api/routes/auth';
import { Row,Col } from 'react-bootstrap';
import image_configs from '../sprites/config';
import { hero_info } from '../api/routes/hero';

const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
        } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
            if (Date.now() - lastRan >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
            }
        }, limit - (Date.now() - lastRan))
        }
    }
}

export default function(props)
{
    const history = useHistory();
    const handle_set_hero = throttle(async (id) => {
        try
        {
            props.set_hero_info(await hero_info(id));
        }
        catch(err)
        {
            console.log(err);
        }
    },1000);
    useEffect(function()
    {
        props.check_logged_in(async id => {
            try{
                props.set_heroes(await get_heroes(id));
            }
            catch(err)
            {
                console.log(err);
            }
        });
    },[]);
    return <div id='heroes' className='pseudo-body'>
        <div className='c-heroes'>
            {
                props.heroes?.map((hero,i) => {
                let image_conf = image_configs[hero.name];
                return <div key={i} onClick={() => handle_set_hero(hero._id)}>
                    <span >{hero.level}</span>
                    <span className={'image-container tier-' + hero.tier}>

                        <img src={image_conf?.src}/>
                    </span>
                    <span className='name'>
                        <span>{hero.name}</span>
                    </span>
                </div>
                })
            }
        </div>
    </div>
}